namespace APIfinanceiro.Models
{
    public class Titulo
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
        public bool Pago { get; set; }
        public string MeioDePagamento { get; set; }
        public TipoTitulo Tipo { get; set; }
    }

    public enum TipoTitulo
    {
        Receber = 0,
        Pagar = 1
    }
}
