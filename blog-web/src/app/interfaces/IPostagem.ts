export interface IPostagem{
  _id : string,
  Titulo : string,
  Imagem : string,
  Conteudo : string,
  Data : string,
  Autor : {id: string, nome: string},
  Like: [String],
  Deslike: [String]
}
