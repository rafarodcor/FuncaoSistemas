namespace FI.AtividadeEntrevista.DML
{
    /// <summary>
    /// Classe de beneficiários que representa o registro na tabela Beneficiario do Banco de Dados
    /// </summary>
    public class Beneficiario : StatusObject
    {
        /// <summary>
        /// Id
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// IdCliente
        /// </summary>
        public long IdCliente { get; set; }

        /// <summary>
        /// CPF
        /// </summary>
        public string CPF { get; set; }

        /// <summary>
        /// Nome
        /// </summary>
        public string Nome { get; set; }
    }
}