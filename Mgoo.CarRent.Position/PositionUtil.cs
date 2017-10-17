using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
 
namespace Mgoo.CarRent.Position
{
    /// <summary> 
    ///    各地图API坐标系统比较与转换;
    ///    WGS84坐标系：即地球坐标系，国际上通用的坐标系。设备一般包含GPS芯片或者北斗芯片获取的经纬度为WGS84地理坐标系,
    ///    谷歌地图采用的是WGS84地理坐标系（中国范围除外）;
    ///    GCJ02坐标系：即火星坐标系，是由中国国家测绘局制订的地理信息系统的坐标系统。由WGS84坐标系经加密后的坐标系。
    ///    谷歌中国地图和搜搜中国地图采用的是GCJ02地理坐标系; BD09坐标系：即百度坐标系，GCJ02坐标系经加密后的坐标系;
    ///    搜狗坐标系、图吧坐标系等，估计也是在GCJ02基础上加密而成的。  
    /// </summary>
    public class PositionUtil
    {

        private static double pi = 3.1415926535897932384626;
        private static double a = 6378245.0;
        private static double ee = 0.00669342162296594323;


        /// <summary>
        /// 84 to 火星坐标系 (GCJ-02) World Geodetic System ==> Mars Geodetic System
        /// </summary>
        /// <param name="lat"></param>
        /// <param name="lon"></param>
        /// <returns></returns>
        public static Point gps84_To_Gcj02(double lat, double lon)
        {
            //if (outOfChina(lat, lon))
            //{
            //     return null;
            // }
            double dLat = transformLat(lon - 105.0, lat - 35.0);
            double dLon = transformLon(lon - 105.0, lat - 35.0);
            double radLat = lat / 180.0 * pi;
            double magic = Math.Sin(radLat);
            magic = 1 - ee * magic * magic;
            double sqrtMagic = Math.Sqrt(magic);
            dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
            dLon = (dLon * 180.0) / (a / sqrtMagic * Math.Cos(radLat) * pi);
            double mgLat = lat + dLat;
            double mgLon = lon + dLon;
            return new Point(mgLat, mgLon);
        }

        /// <summary>
        ///  火星坐标系 (GCJ-02) to 84 * * 
        /// </summary>
        /// <param name="lat"></param>
        /// <param name="lon"></param>
        /// <returns></returns> 
        public static Point gcj_To_Gps84(double lat, double lon)
        {
            Point gps = transform(lat, lon);
            double lontitude = lon * 2 - gps.Lng;
            double latitude = lat * 2 - gps.Lat;
            return new Point(latitude, lontitude);
        }
        /// <summary>
        /// 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法 将 GCJ-02 坐标转换成 BD-09 坐标
        /// </summary>
        /// <param name="gg_lat"></param>
        /// <param name="gg_lon"></param>
        /// <returns></returns>
        public static Point gcj02_To_Bd09(double gg_lat, double gg_lon)
        {
            double x = gg_lon, y = gg_lat;
            double z = Math.Sqrt(x * x + y * y) + 0.00002 * Math.Sin(y * pi);
            double theta = Math.Atan2(y, x) + 0.000003 * Math.Cos(x * pi);
            double bd_lon = z * Math.Cos(theta) + 0.0065;
            double bd_lat = z * Math.Sin(theta) + 0.006;
            return new Point(bd_lat, bd_lon);
        }
        /// <summary>
        /// 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法 * * 将 BD-09 坐标转换成GCJ-02 坐标 * * @param
        /// </summary>
        /// <param name="bd_lat"></param>
        /// <param name="bd_lon"></param>
        /// <returns></returns>
        public static Point bd09_To_Gcj02(double bd_lat, double bd_lon)
        {
            double x = bd_lon - 0.0065, y = bd_lat - 0.006;
            double z = Math.Sqrt(x * x + y * y) - 0.00002 * Math.Sin(y * pi);
            double theta = Math.Atan2(y, x) - 0.000003 * Math.Cos(x * pi);
            double gg_lon = z * Math.Cos(theta);
            double gg_lat = z * Math.Sin(theta);
            return new Point(gg_lat, gg_lon);
        }
        /// <summary>
        /// (BD-09)-->84
        /// </summary>
        /// <param name="bd_lat"></param>
        /// <param name="bd_lon"></param>
        /// <returns></returns>
        public static Point bd09_To_Gps84(double bd_lat, double bd_lon)
        {

            Point gcj02 = PositionUtil.bd09_To_Gcj02(bd_lat, bd_lon);
            Point map84 = PositionUtil.gcj_To_Gps84(gcj02.Lat, gcj02.Lng);
            return map84;

        }
        /// <summary>
        ///  将  gps84 坐标转换成 BD-09 坐标
        /// </summary>
        /// <returns></returns>
        public static Point gps84_To_Bd09(double lat, double lon)
        {
            double π = pi * 3000 / 180;
            double x = lon, y = lat;
            double z = Math.Sqrt(x * x + y * y) + 0.00002 * Math.Sin(y * π);
            double theta = Math.Atan2(y, x) + 0.000003 * Math.Cos(x * π);
            Point bd09 = transform(z * Math.Sin(theta) + 0.006, z * Math.Cos(theta) + 0.0065);
            return bd09;
        }
        public static bool outOfChina(double lat, double lon)
        {
            if (lon < 72.004 || lon > 137.8347)
                return true;
            if (lat < 0.8293 || lat > 55.8271)
                return true;
            return false;
        }
        public static Point transform(double lat, double lon)
        {
            //if (outOfChina(lat, lon))
            //{
            //    return new Gps(lat, lon);
            //}
            double dLat = transformLat(lon - 105.0, lat - 35.0);
            double dLon = transformLon(lon - 105.0, lat - 35.0);
            double radLat = lat / 180.0 * pi;
            double magic = Math.Sin(radLat);
            magic = 1 - ee * magic * magic;
            double sqrtMagic = Math.Sqrt(magic);
            dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
            dLon = (dLon * 180.0) / (a / sqrtMagic * Math.Cos(radLat) * pi);
            double mgLat = lat + dLat;
            double mgLon = lon + dLon;
            return new Point(mgLat, mgLon);
        }
        public static double transformLat(double x, double y)
        {
            double ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y
                    + 0.2 * Math.Sqrt(Math.Abs(x));
            ret += (20.0 * Math.Sin(6.0 * x * pi) + 20.0 * Math.Sin(2.0 * x * pi)) * 2.0 / 3.0;
            ret += (20.0 * Math.Sin(y * pi) + 40.0 * Math.Sin(y / 3.0 * pi)) * 2.0 / 3.0;
            ret += (160.0 * Math.Sin(y / 12.0 * pi) + 320 * Math.Sin(y * pi / 30.0)) * 2.0 / 3.0;
            return ret;
        }
        public static double transformLon(double x, double y)
        {
            double ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1
                    * Math.Sqrt(Math.Abs(x));
            ret += (20.0 * Math.Sin(6.0 * x * pi) + 20.0 * Math.Sin(2.0 * x * pi)) * 2.0 / 3.0;
            ret += (20.0 * Math.Sin(x * pi) + 40.0 * Math.Sin(x / 3.0 * pi)) * 2.0 / 3.0;
            ret += (150.0 * Math.Sin(x / 12.0 * pi) + 300.0 * Math.Sin(x / 30.0
                    * pi)) * 2.0 / 3.0;
            return ret;
        }

    }
}
