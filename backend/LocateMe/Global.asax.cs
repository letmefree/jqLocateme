using System;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace LocateMe
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : System.Web.HttpApplication
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapRoute("Region route", "region", new { controller = "Index", action = "Region" });
            routes.MapRoute("City route", "city", new { controller = "Index", action = "City" });
            routes.MapRoute("Street route", "street", new { controller = "Index", action = "Street" });

            routes.MapRoute(
               "Default",
               "{controller}/{action}",
               new { controller = "Index", action = "Index" }
             );
        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RegisterRoutes(RouteTable.Routes);
        }
    }
}