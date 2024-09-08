using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        public void GerenciarBeneficiarios(long idCliente, List<Beneficiario> beneficiarios)
        {
            foreach (var beneficiario in beneficiarios)
            {
                switch (true)
                {
                    case bool _ when beneficiario.IsNew:
                        beneficiario.IdCliente = idCliente;
                        Incluir(beneficiario);
                        break;

                    case bool _ when beneficiario.IsEdited:
                        Alterar(beneficiario);
                        break;

                    case bool _ when beneficiario.IsDeleted:
                        Excluir(beneficiario.Id);
                        break;
                }
            }
        }      

        /// <summary>
        /// Inclui um novo beneficiário
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiário</param>
        public void Incluir(Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario benef = new DAL.DaoBeneficiario();
            benef.Incluir(beneficiario);
        }

        /// <summary>
        /// Altera um beneficiário
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiário</param>
        public void Alterar(Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario benef = new DAL.DaoBeneficiario();
            benef.Alterar(beneficiario);
        }

        /// <summary>
        /// Exclui um beneficiário
        /// </summary>
        /// <param name="id">Id do beneficiário</param>
        public void Excluir(long id)
        {
            DAL.DaoBeneficiario benef = new DAL.DaoBeneficiario();
            benef.Excluir(id);
        }

        /// <summary>
        /// Lista os beneficiários do cliente
        /// </summary>
        public List<Beneficiario> Pesquisa(long idCliente)
        {
            DAL.DaoBeneficiario benef = new DAL.DaoBeneficiario();
            return benef.Pesquisa(idCliente);
        }
    }
}