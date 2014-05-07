using BO;
using DC;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DP
{
    public static class Dataprovider
    {
        /// <summary>
        /// Поиск регионов
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static List<locRegionDTO> SearchRegions(string query, int rowsCount)
        {
            using (var dc = new LocateMeDataContext())
            {
                return (from r in dc.locRegions where r.Region.StartsWith(query) select new locRegionDTO { Id = r.Id, Region = r.Region }).Take(rowsCount).ToList();
            }
        }

        /// <summary>
        /// Поиск городов в регионе
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static List<locCityDTO> SearchCities(int regionId, string query, int rowsCount)
        {
            using (var dc = new LocateMeDataContext())
            {
                return (from c in dc.locCities where c.City.StartsWith(query) && c.RegionId == regionId select new locCityDTO { City = c.City, Id = c.Id, CityType=c.CityType }).Take(rowsCount).ToList();
            }
        }

        /// <summary>
        /// Поиск улиц в городе
        /// </summary>
        /// <param name="cityId"></param>
        /// <param name="query"></param>
        /// <param name="rowsCount"></param>
        /// <returns></returns>
        public static List<locStreetDTO> SearchStreets(int cityId, string query, int rowsCount)
        {
            using (var dc = new LocateMeDataContext())
            {
                return (from s in dc.locStreets where s.Street.StartsWith(query) && s.CityId == cityId select new locStreetDTO { Street = s.Street, Id = s.Id, StreetType = s.StreetType }).Take(rowsCount).ToList();
            }
        }
    }
}
