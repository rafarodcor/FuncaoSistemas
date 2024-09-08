using FI.AtividadeEntrevista.DML;
using System.Collections.Generic;
using WebAtividadeEntrevista.Models;
using System.Linq;

namespace FI.WebAtividadeEntrevista.Util
{
    public static class Util
    {
        public static List<Beneficiario> Convert(List<BeneficiarioModel> beneficiariosModel)
        {
            List<Beneficiario> beneficiarios = new List<Beneficiario>();
            if (beneficiariosModel.Any())
            {
                foreach (var beneficiarioModel in beneficiariosModel)
                {
                    var beneficiario = new Beneficiario
                    {
                        Id = beneficiarioModel.Id,
                        CPF = beneficiarioModel.CPF,
                        Nome = beneficiarioModel.Nome,
                        IdCliente = beneficiarioModel.IdCliente,
                        IsNew = beneficiarioModel.IsNew,
                        IsEdited = beneficiarioModel.IsEdited,
                        IsDeleted = beneficiarioModel.IsDeleted
                    };
                    beneficiarios.Add(beneficiario);
                }
            }
            return beneficiarios;
        }
    }
}