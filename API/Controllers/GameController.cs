using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/game")]

public class GameController
{
    private int pick;
    private int car;
    private int goat;

    public GameController()
    {
        Random rnd = new Random();
        car = rnd.Next(3);
        goat = 0;
    }

    [HttpGet("pick/{pick}")]
    public ActionResult<int> setPick(int pick)
    {
        this.pick = pick;

        while (goat == car || goat == pick)
            goat++;

        return goat;
    }

    [HttpGet("choice/{choice}")]
    public ActionResult<int> getOutcome(string choice)
    {
        bool isCarPick = pick == car;

        if (isCarPick)

            return choice == "yes" ? 0 : 1;
        else
            return choice == "yes" ? 1 : 0;
    }
}