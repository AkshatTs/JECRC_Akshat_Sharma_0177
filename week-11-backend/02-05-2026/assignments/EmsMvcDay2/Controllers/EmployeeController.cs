using EmsMvcDay2.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace EmsMvcDay2.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly IHttpClientFactory _clientFactory;

        public EmployeeController(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        // GET ALL VIEW
        public async Task<IActionResult> Index()
        {
            var client = _clientFactory.CreateClient("EmsApi");

            // This sends the "Request" arrow to your API container!
            var response = await client.GetAsync("api/Employees");

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var employees = JsonSerializer.Deserialize<List<Employee>>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                return View(employees); // Sends the data to the HTML view
            }

            return View(new List<Employee>());
        }

        // GET: Shows the blank form
        public IActionResult Create()
        {
            return View();
        }

        // POST: Takes the form data and sends it to the API
        [HttpPost]
        public async Task<IActionResult> Create(Employee employee)
        {
            var client = _clientFactory.CreateClient("EmsApi");

            // This sends the data as JSON to your API container
            var response = await client.PostAsJsonAsync("api/Employees", employee);

            if (response.IsSuccessStatusCode)
            {
                // If successful, redirect back to the table view
                return RedirectToAction("Index");
            }

            return View(employee);
        }
        // --- EDIT (UPDATE) ---

        // GET: Fetches the employee data to fill the form
        public async Task<IActionResult> Edit(int id)
        {
            var client = _clientFactory.CreateClient("EmsApi");
            var response = await client.GetAsync($"api/Employees/{id}");

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var employee = JsonSerializer.Deserialize<Employee>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                return View(employee);
            }
            return RedirectToAction("Index");
        }

        // POST: Sends the updated data to the API
        [HttpPost]
        public async Task<IActionResult> Edit(int id, Employee employee)
        {
            var client = _clientFactory.CreateClient("EmsApi");
            var response = await client.PutAsJsonAsync($"api/Employees/{id}", employee);

            if (response.IsSuccessStatusCode)
            {
                return RedirectToAction("Index");
            }
            return View(employee);
        }

        // --- DELETE ---

        // GET: Shows a confirmation page before deleting
        public async Task<IActionResult> Delete(int id)
        {
            var client = _clientFactory.CreateClient("EmsApi");
            var response = await client.GetAsync($"api/Employees/{id}");

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var employee = JsonSerializer.Deserialize<Employee>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                return View(employee);
            }
            return RedirectToAction("Index");
        }

        // POST: Tells the API to actually delete the record
        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var client = _clientFactory.CreateClient("EmsApi");
            var response = await client.DeleteAsync($"api/Employees/{id}");

            return RedirectToAction("Index");
        }
    }
}