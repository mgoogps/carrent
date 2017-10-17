using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Position
{
    public class Point
    {
        private double _Lat;
        private double _Lng;
        private string _address;
        public Point(double wgLat, double wgLng)
        {
            Lat = wgLat;
            Lng = wgLng;
        }

        public string Address
        {
            get
            {
                return _address ?? "未知.";
            }

            set
            {
                _address = value;
            }
        }

        public double Lat
        {
            get
            {
                return _Lat;
            }

            set
            {
                _Lat = value;
            }
        }

        public double Lng
        {
            get
            {
                return _Lng;
            }

            set
            {
                _Lng = value;
            }
        }

        public override String ToString()
        {
            return Lat + "," + Lng;
        }
    }

}
