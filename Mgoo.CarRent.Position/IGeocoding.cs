using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Position
{
    public interface IGeocoding
    {
        string key { get; }
        /// <summary>
        /// 经纬度转换
        /// </summary>
        /// <param name="lat"></param>
        /// <param name="lng"></param>
        /// <param name="address"></param>
        /// <returns></returns>
        Point Translate(double lat, double lng, bool address = false);

        /// <summary>
        /// 蒋经纬度转换成WGS84
        /// </summary>
        /// <param name="lat"></param>
        /// <param name="lng"></param>
        /// <returns></returns>
        Point TranslateGps84(double lat, double lng);


        /// <summary>
        /// 根据经纬度获取中文地址
        /// </summary>
        /// <param name="gps"></param>
        /// <returns></returns>
        string GetAddress(Point gps);
    }
}
