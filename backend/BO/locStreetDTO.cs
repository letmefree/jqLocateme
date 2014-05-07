using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BO
{
    public class locStreetDTO
    {
        public int Id { get; set; }
        public int CityId { get; set; }
        public string Street { get; set; }
        public string StreetType { get; set; }
        public int? PostIndex { get; set; }
    }
}
