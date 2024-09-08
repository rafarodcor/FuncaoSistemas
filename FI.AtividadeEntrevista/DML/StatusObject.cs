namespace FI.AtividadeEntrevista.DML
{
    public abstract class StatusObject
    {
        public bool IsNew { get; set; } = false;
        public bool IsEdited { get; set; } = false;
        public bool IsDeleted { get; set; } = false;
    }
}