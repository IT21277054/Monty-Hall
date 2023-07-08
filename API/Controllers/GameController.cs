using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/game")]

public class GameController
{

    [HttpGet("pick/{pick}")]
    public ActionResult<Values> setPick(int pick)
    {
        
        Random rnd = new Random();
        int car = rnd.Next(3);
        int goat = 0;

        while (goat == car || goat == pick)
            goat++;

        var values = new Values
        {
            Goat = goat,
            Car = car,
            Pick = pick
        };

        return values;
    }

    [HttpGet("choice/{choice}/{car}/{pick}")]
    public ActionResult<int> getOutcome(string choice,int car, int pick)
    {
        bool isCarPick = pick == car;

        if (isCarPick)
            return choice == "yes" ? 0 : 1;
        else
            return choice == "yes" ? 1 : 0;
    }
}