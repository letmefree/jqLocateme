using BO;
using DP;
using System;
using System.Web.Mvc;
using System.Linq;

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
            return Json(from i in Dataprovider.SearchRegions(searchquery, 5) select new { k = i.Id, v = i.Region });
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
