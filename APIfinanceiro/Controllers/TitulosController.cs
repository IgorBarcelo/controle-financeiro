using APIfinanceiro.Models;
using Microsoft.AspNetCore.Mvc;

namespace APIfinanceiro.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TitulosController : ControllerBase
    {
        private static List<Titulo> Titulos = new List<Titulo>();
        private readonly ILogger<TitulosController> _logger;

        public TitulosController(ILogger<TitulosController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Titulo> Get([FromQuery] TipoTitulo? tipo)
        {
            if (tipo.HasValue)
            {
                return Titulos.Where(t => t.Tipo == tipo.Value);
            }
            return Titulos;
        }

        [HttpGet("{id}")]
        public ActionResult<Titulo> Get(int id)
        {
            var titulo = Titulos.FirstOrDefault(t => t.Id == id);
            if (titulo == null)
            {
                return NotFound();
            }
            return titulo;
        }

        [HttpPost]
        public ActionResult<Titulo> Post(Titulo titulo)
        {
            _logger.LogInformation("Recebido POST: {@Titulo}", titulo);

            titulo.Id = Titulos.Count + 1;
            Titulos.Add(titulo);
            return CreatedAtAction(nameof(Get), new { id = titulo.Id }, titulo);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Titulo tituloAtualizado)
        {
            var titulo = Titulos.FirstOrDefault(t => t.Id == id);
            if (titulo == null)
            {
                return NotFound();
            }
            titulo.Descricao = tituloAtualizado.Descricao;
            titulo.Valor = tituloAtualizado.Valor;
            titulo.Data = tituloAtualizado.Data;
            titulo.Pago = tituloAtualizado.Pago;
            titulo.MeioDePagamento = tituloAtualizado.MeioDePagamento;
            titulo.Tipo = tituloAtualizado.Tipo;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var titulo = Titulos.FirstOrDefault(t => t.Id == id);
            if (titulo == null)
            {
                return NotFound();
            }
            Titulos.Remove(titulo);
            return NoContent();
        }
    }
}
