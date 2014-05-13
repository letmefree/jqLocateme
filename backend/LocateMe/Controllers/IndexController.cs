using BO;
using DP;
using System;
using System.Web.Mvc;
using System.Linq;
using System.Text.RegularExpressions;

namespace LocateMe.Controllers
{
    public class IndexController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View("index");
        }

        [HttpPost]
        public JsonResult Region(string searchquery)
        {
<<<<<<< HEAD
            return Json(from i in Dataprovider.SearchRegions(searchquery, 5) select new { k = i.Id, v = i.Region });        
=======
            return Json(from i in Dataprovider.SearchRegions(searchquery, 15) select new { k = i.Id, v = i.Region });        
>>>>>>> 5d7be9f8044f7b1685c9b323677d1be2d4de6c5a
        }

        [HttpPost]
        public JsonResult City(int regionId, string searchquery)
        {
            return Json(from i in Dataprovider.SearchCities(regionId, searchquery, 5) select new { k = i.Id, v = string.Format("{0} {1}.", i.City, i.CityType) });
        }

        [HttpPost]
        public JsonResult Street(int cityId, string searchquery)
        {
            return Json(from i in Dataprovider.SearchStreets(cityId, searchquery, 5) select new { k = i.Id, v = string.Format("{0} {1}.", i.Street, i.StreetType) });
        }
    }
}
