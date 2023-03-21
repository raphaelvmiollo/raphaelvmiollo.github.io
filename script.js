

var input_tarefa = document.getElementById("input-tarefa");
var lista = document.getElementById("lista")


function criarTarefa(event) {
    event.preventDefault();

    var tarefa = document.createElement("li");
    var tarefa_text = document.createElement("span");
    tarefa_text.textContent = input_tarefa.value;
    var excluir_btn = document.createElement("button");
    excluir_btn.textContent = "x";

    excluir_btn.addEventListener("click", function () { tarefa.remove() })


    tarefa.appendChild(tarefa_text);
    tarefa.appendChild(excluir_btn);

    lista.append(tarefa);


 

}