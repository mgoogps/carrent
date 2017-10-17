using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Position.Geocod
{
    public class Google : IGeocoding
    {
        public string key
        {
            get
            {
                //burt Google账号上的key
                return "AIzaSyAn0OQpiu7Dow1__WmjNBQYUJE2-bQw7p4";
            }
             
        }
        public string language { get; set; }
        public string GetAddress(Point gps)
        {
            //Google Geocoding Api
            //https://developers.google.com/maps/documentation/geocoding/intro#start

            DAL.MgooWebClient mwc = new DAL.MgooWebClient();
            mwc.Method = "get";
            mwc.Url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + gps.Lng + "," + gps.Lat + "&key=" + key + "&result_type=street_address&language="+language;
            string jsonLocation = mwc.Send();

            Dictionary<string, object> addressDic = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonLocation);
            string address = "未获取到地址.";
            if (addressDic["status"].Equals("OK"))
            {
                var results = (JArray)addressDic["results"];
                var result = (JObject)results[0];

                address = result["formatted_address"].ToString();
            }
            else if (addressDic["status"].Equals("OVER_QUERY_LIMIT")) 
            {
                //key 配额已超限
                var path = System.AppDomain.CurrentDomain.BaseDirectory + "/google.log";
                File.AppendAllText(path, DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff  ") + "已超出配额。" + Environment.NewLine);
                return "OVER_QUERY_LIMIT.";
            }
            return address;
        }

        /// <summary>
        /// Google中国用的是GCJ02坐标系，Google国外用的是WGS84坐标系
        /// </summary>
        /// <param name="lat"></param>
        /// <param name="lng"></param>
        /// <param name="address"></param>
        /// <returns></returns>
        public Point Translate(double lat, double lng, bool address = false)
        {
            //国内转成 Gcj02
            if (PositionUtil.outOfChina(lat, lng))
            {
                return PositionUtil.gps84_To_Gcj02(lat,lng); 
            }
            //国外直接返回
            return new Point(lat, lng);
        }

        public Point TranslateGps84(double lat, double lng)
        {
            throw new NotImplementedException();
        }
    }
}
