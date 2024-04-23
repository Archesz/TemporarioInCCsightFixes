# InCCsight - Correções e Guia

## Guia temporário:

### Executando os métodos

1 - Execute os métodos com os seguintes scripts (dentro da pasta raiz):
    - python `python ./methods/roqs/main.py -p path`
    - python `python ./methods/CNNBased/main3D.py -p path`
    
2 - Para verificar se foram executados, cheque a pasta `./csvs`, ele deve possuir os arquivos referentes aos métodos executados.

3 - Dentro de cada pasta de sujeito, devemos ter os arquivos gerados dentro de `InCCsight`.

4 - Para preparar os dados para interface, execute `python ./csvs/transformJson.py -p path`

### Executando a Interface

1 - Se for a primeira vez executando, solicitamos que faça um `npm install`, isso instalará as dependências necessárias para a interface ser executada;

2 - Execute o comando `npm start` para abrir a interface (No momento, no broswer -> localhost:3000);
