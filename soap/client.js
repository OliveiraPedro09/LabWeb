const soap = require('soap');

const wsdlUrl = 'http://localhost:8000/math?wsdl';

async function callSoapService() {
  try {
    // Cria o cliente SOAP a partir do WSDL
    const client = await soap.createClientAsync(wsdlUrl);
    
    // Soma
    const [somaResult] = await client.somaAsync({ a: 10, b: 10 });
    console.log('Resultado da soma:', somaResult.result);

    // Subtação
    const [subtracaoResult] = await client.subtracaoAsync({ a: 10, b: 10 });
    console.log('Resultado da subtração:', subtracaoResult.result);

    // Muliplicação
    const [multiplicacaoResult] = await client.multiplicacaoAsync({ a: 10, b: 10 });
    console.log('Resultado da multiplicação:', multiplicacaoResult.result);

    // Divisão
    const [divisaoResult] = await client.divisaoAsync({ a: 10, b: 10 });
    console.log('Resultado da divisão:', divisaoResult.result);
  } catch (err) {
    console.error('Erro ao consumir o serviço SOAP:', err);
  }
}

callSoapService();

