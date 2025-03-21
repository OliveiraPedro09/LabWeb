const express = require('express');
const soap = require('soap');
const app = express();
const port = 8000;

const operations = {
  soma: (args) => {
    return { result: args.a + args.b };
  },
  subtracao: (args) => {
    return { result: args.a - args.b };
  },
  multiplicacao: (args) => {
    return { result: args.a * args.b };
  },
  divisao: (args) => {
    if (args.b === 0) {
      throw new Error('Divisão por zero não permitida');
    }
    return { result: args.a / args.b };
  },
};

const wsdl = `
<definitions xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
             xmlns:tns="http://localhost:8000/math"
             xmlns:xsd="http://www.w3.org/2001/XMLSchema"
             targetNamespace="http://localhost:8000/math">

  <message name="somaRequest">
    <part name="a" type="xsd:int"/>
    <part name="b" type="xsd:int"/>
  </message>

  <message name="somaResponse">
    <part name="result" type="xsd:int"/>
  </message>

  <portType name="MathServicePortType">
    <operation name="soma">
      <input message="tns:somaRequest"/>
      <output message="tns:somaResponse"/>
    </operation>
    <operation name="subtracao">
      <input message="tns:somaRequest"/>
      <output message="tns:somaResponse"/>
    </operation>
    <operation name="multiplicacao">
      <input message="tns:somaRequest"/>
      <output message="tns:somaResponse"/>
    </operation>
    <operation name="divisao">
      <input message="tns:somaRequest"/>
      <output message="tns:somaResponse"/>
    </operation>
  </portType>

  <binding name="MathServiceBinding" type="tns:MathServicePortType">
    <soap:binding style="rpc" transport="http://schemas.xmlsoap.org/soap/http"/>
    <operation name="soma">
      <soap:operation soapAction="http://localhost:8000/math/soma"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="subtracao">
      <soap:operation soapAction="http://localhost:8000/math/subtracao"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="multiplicacao">
      <soap:operation soapAction="http://localhost:8000/math/multiplicacao"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="divisao">
      <soap:operation soapAction="http://localhost:8000/math/divisao"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
  </binding>

  <service name="MathService">
    <port name="MathServicePort" binding="tns:MathServiceBinding">
      <soap:address location="http://localhost:8000/math"/>
    </port>
  </service>
</definitions>
`;

// Definição do servidor SOAP
const soapServer = {
  MathService: {
    MathServicePort: operations,
  },
};

app.listen(port, () => {
  console.log(`Servidor SOAP rodando em http://localhost:${port}`);

  // URL do WSDL
  app.get('/math?wsdl', (req, res) => {
    res.set('Content-Type', 'text/xml');
    res.send(wsdl);
  });

  soap.listen(app, '/math', soapServer, wsdl);
});
