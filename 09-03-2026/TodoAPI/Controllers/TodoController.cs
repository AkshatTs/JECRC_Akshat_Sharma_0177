using Microsoft.AspNetCore.Mvc;
using TodoAPI.Data;
using TodoAPI.Models;

namespace TodoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TodoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Todo
        [HttpGet]
        public IActionResult GetTodos()
        {
            var todos = _context.Todos.ToList();
            return Ok(todos);
        }

        // GET: api/Todo/5
        [HttpGet("{id}")]
        public IActionResult GetTodo(int id)
        {
            var todo = _context.Todos.Find(id);

            if (todo == null)
            {
                return NotFound();
            }

            return Ok(todo);
        }

        // POST: api/Todo
        [HttpPost]
        public IActionResult AddTodo(Todo todo)
        {
            _context.Todos.Add(todo);
            _context.SaveChanges();

            return Ok(todo);
        }

        // PUT: api/Todo/5
        [HttpPut("{id}")]
        public IActionResult UpdateTodo(int id, Todo updatedTodo)
        {
            var todo = _context.Todos.Find(id);

            if (todo == null)
                return NotFound();

            todo.Title = updatedTodo.Title;
            todo.IsCompleted = updatedTodo.IsCompleted;
            todo.Priority = updatedTodo.Priority;

            _context.SaveChanges();

            return Ok(todo);
        }

        // DELETE: api/Todo/5
        [HttpDelete("{id}")]
        public IActionResult DeleteTodo(int id)
        {
            var todo = _context.Todos.Find(id);

            if (todo == null)
            {
                return NotFound();
            }

            _context.Todos.Remove(todo);
            _context.SaveChanges();

            return NoContent();
        }
        [HttpGet("active")]
        public IActionResult GetActiveTasks()
        {
            var tasks = _context.Todos
                .Where(t => t.IsCompleted == false)
                .ToList();

            return Ok(tasks);
        }
        [HttpGet("completed")]
        public IActionResult GetCompletedTasks()
        {
            var tasks = _context.Todos
                .Where(t => t.IsCompleted == true)
                .ToList();

            return Ok(tasks);
        }
        [HttpGet("search")]
        public IActionResult SearchTasks(string query)
        {
            var tasks = _context.Todos
                .Where(t => t.Title.Contains(query))
                .ToList();

            return Ok(tasks);
        }
    }
}