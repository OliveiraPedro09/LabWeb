const API_URL = "http://localhost:3000/usuarios";

let modoEdicao = false;
let usuarioEmEdicao = null;

document.getElementById("form").addEventListener("submit", async (e) => {
   e.preventDefault();
   const nome = document.getElementById("nome").value;
   const telefone = document.getElementById("telefone").value;
   
   if (modoEdicao && usuarioEmEdicao) {
      await fetch(`${API_URL}/${usuarioEmEdicao}`, {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ nome, telefone })
      });

      modoEdicao = false;
      usuarioEmEdicao = null;
      document.getElementById("submitBtn").textContent = "Cadastrar";
      
   } else {
      await fetch(API_URL, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ nome, telefone })
      });
   }

   document.getElementById("nome").value = "";
   document.getElementById("telefone").value = "";

   carregarUsuarios();
});

async function carregarUsuarios() {
   const res = await fetch(API_URL);
   const usuarios = await res.json();
   document.getElementById("usuarios").innerHTML = usuarios.map(u =>
      `<tr>
         <td>${u.id}</td>
         <td>${u.nome}</td>
         <td>${u.telefone}</td>
         <td>
            <a href="#" onclick="prepararEdicao(${u.id})">Editar</a> | 
            <button onclick="excluirUsuario(${u.id})">Excluir</button>
         </td>
      </tr>`
   ).join('');
}

async function prepararEdicao(id) {
   const res = await fetch(`${API_URL}/${id}`);
   const usuario = await res.json();
   
   document.getElementById("nome").value = usuario.nome;
   document.getElementById("telefone").value = usuario.telefone;
   
   modoEdicao = true;
   usuarioEmEdicao = id;
   document.getElementById("submitBtn").textContent = "Editar";
}

async function excluirUsuario(id) {
   await fetch(`${API_URL}/${id}`, { method: "DELETE" });
   carregarUsuarios();
}

carregarUsuarios();
