using Cars_Application.Models.DTOs;
using Cars_Application.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Cars_Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private static readonly List<Car> _cars = new List<Car>();

        [HttpGet]
        public IActionResult GetAllCars()
        {
            var responseList = _cars.Select(MapToResponseDto).ToList();

            return Ok(responseList);
        }

        [HttpGet("{id}")]
        public IActionResult GetCarById(Guid id)
        {
            var car = _cars.FirstOrDefault(c => c.Id == id);
            if (car == null)
            {
                return NotFound(new { Message = $"Car with ID {id} not found." });
            }

            return Ok(MapToResponseDto(car));
        }

        [HttpPost]
        public IActionResult CreateCar([FromBody] CreateCarDto createDto)
        {
            var newCar = new Car
            {
                Id = Guid.NewGuid(),
                Brand = createDto.Brand,
                ModelName = createDto.ModelName,
                ManufactureYear = createDto.ManufactureYear,
                EngineCC = createDto.EngineCC,
                Color = createDto.Color,
                FuelType = createDto.FuelType,
                Price = createDto.Price
            };

            _cars.Add(newCar);

            return CreatedAtAction(nameof(GetCarById), new { id = newCar.Id }, MapToResponseDto(newCar));
        }

        [HttpPatch("{id}")]
        public IActionResult PatchCar(Guid id, [FromBody] CreateCarDto patchDto)
        {
            var existingCar = _cars.FirstOrDefault(c => c.Id == id);
            if (existingCar == null)
            {
                return NotFound(new { Message = $"Cannot update. Car with ID {id} not found." });
            }

            existingCar.Color = patchDto.Color;
            existingCar.Price = patchDto.Price;

            return Ok(MapToResponseDto(existingCar));
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCar(Guid id)
        {
            var car = _cars.FirstOrDefault(c => c.Id == id);
            if (car == null)
            {
                return NotFound(new { Message = $"Cannot delete. Car with ID {id} not found." });
            }

            _cars.Remove(car);
            return NoContent();
        }

        private static CarResponseDto MapToResponseDto(Car car)
        {
            return new CarResponseDto
            {
                Id = car.Id,
                Brand = car.Brand,
                ModelName = car.ModelName,
                ManufactureYear = car.ManufactureYear,
                EngineCC = car.EngineCC,
                Color = car.Color,
                FuelType = car.FuelType,
                Price = car.Price
            };
        }
    }
}