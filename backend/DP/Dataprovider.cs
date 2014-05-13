using BO;
using DC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

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
                var splitter = query.Split(' ');
                List<locRegionDTO> regions = (from r in dc.locRegions where r.Region.Contains(query) select new locRegionDTO { Id = r.Id, Region = r.Region }).ToList();
                return ReversSearchResults(query, regions, rowsCount);
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

        /// <summary>
        /// Универсальный метод для перестановки слов в результатах поиска - позволяет получать предсказуемый ответ при вводе "Башкорк..." (в БД как "Республика Башкоркостан"). Можно конечно поменять данные в БД, но это уменьшит универсальность и, возможную, достоверность базы
        /// </summary>
        /// <typeparam name="T">locRegionDTO (locCityDTO|locStreetsDTO)</typeparam>
        /// <param name="searchQuery"></param>
        /// <param name="searchResults"></param>
        /// <param name="rowsCount"></param>
        /// <returns></returns>
        public static List<T> ReversSearchResults<T>(string searchQuery, List<T> searchResults, int rowsCount) where T : new()
        {
            Match match;

            var value = string.Empty;
            var regexpPattern = string.Format("\\b([а-я\\-]*?{0}\\S*)", searchQuery);
            var indexer = new int();
            string[] splitter;


            if (typeof(T) == typeof(locRegionDTO))
            {
                var returnList = new List<locRegionDTO>();

                foreach (var one in searchResults as List<locRegionDTO>)
                {
<<<<<<< HEAD
<<<<<<< HEAD
                    var revertedText = IsStartWith(searchQuery, one.Region) ? one.Region : RevertText(searchQuery, one.Region);
=======
                    var revertedText = RevertText(searchQuery, one.Region);
>>>>>>> 5d7be9f8044f7b1685c9b323677d1be2d4de6c5a
=======
                    var revertedText = RevertText(searchQuery, one.Region);
>>>>>>> 5d7be9f8044f7b1685c9b323677d1be2d4de6c5a
                    if (IsStartWith(searchQuery,revertedText))
                    {
                        if (indexer < rowsCount)
                        {
                            returnList.Add(new locRegionDTO
                            {
                                Id = one.Id,
                                Region = revertedText,
                                OriginalRegion = one.Region
                            });
                            indexer++;
                        }
                    }
                }

                return returnList as List<T>;
            }

            return null;
        }

        internal static string RevertText(string query, string rowValue)
        {
            var splitter = rowValue.Split(' ');
            var val = new StringBuilder();

            if (splitter.Length > 1)
            {
                foreach (var one in splitter)
                {
                    if (IsStartWith(query, one))
                    {
                        val.Insert(0, one.Trim());
                        val.Insert(one.Length, " ");
                    }
                    else
                    {
                        val.Append(one.ToLower().Trim());
                        val.Append(" ");
                    }

                }
            }
            else val.Append(splitter[0]);

            return val.ToString().Trim();
        }

        internal static bool IsStartWith(string startString, string text)
        {
            return Regex.IsMatch(text, "^" + startString, RegexOptions.IgnoreCase);
        }
    }
}
