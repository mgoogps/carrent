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
    public class Baidu : IGeocoding
    {
        public string key
        {
            get
            {
                return "PFEwxiwsyv4GjEQcZrNZS0NsIkEvU8TL";
            }

         
        }

        public string GetAddress(Point gps)
        {
            try
            {
                //百度地图 Geocoding API
                //http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding

                DAL.MgooWebClient wc = new DAL.MgooWebClient();
                wc.Url = "http://api.map.baidu.com/geocoder/v2/?ak="+key+"&location=" + gps.Lng + "," + gps.Lat + "&output=json&pois=1&extensions_poi=0&radius=1000";
                //http://api.map.baidu.com/geocoder/v2/?location=27.148609,111.227029&output=json&pois=1&ak=PFEwxiwsyv4GjEQcZrNZS0NsIkEvU8TL&extensions_poi=0&radius=1000
                wc.Method = "GET";
                string jsonLocation = wc.Send();

                var addressDic = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonLocation);
                var formatted_address = "";
                if (addressDic["status"].ToString().Equals("0"))
                {
                    JObject result = (JObject)addressDic["result"];
                  //  var result = addressDic["result"] as Dictionary<string, object>;
                    formatted_address = result["formatted_address"].ToString();
                    var pois = (JArray)result["pois"];
                    if (pois.Count > 0)
                    {
                        var pois_first = pois[0];
                        var pois_first_name = pois_first["name"].ToString();
                        var pois_first_direction = pois_first["direction"].ToString(); //方向
                        var pois_first_distance = pois_first["distance"].ToString(); //该POI到请求坐标的距离(米)
                        formatted_address += ",离" + pois_first_name + "(" + pois_first_direction + ")约" + Convert.ToInt32(pois_first_distance)+"米";
                    }
                    return formatted_address;
                }
                else if(addressDic["status"].ToString().Equals("1"))
                {
                    var path = System.AppDomain.CurrentDomain.BaseDirectory + "/baidu.log";
                    File.AppendAllText(path, DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff  ") + "配额校验失败" + Environment.NewLine);
                    return "配额校验失败.";
                }
                else
                {
                    return "未获取到地址信息.";
                }
            }
            catch (Exception)
            {
                return "未知.";
            }
        }

        public Point Translate(double lat, double lng, bool address = false)
        {
            
            Point gps;
            if (lat == -1.0 && lng == -1.0)
            {
                gps = new Point(-1.000, -1.000);
                gps.Address = "未解析到地址.";
                return gps;
            }
       
            gps = PositionUtil.gps84_To_Bd09(lat, lng);
            try
            {
                if (address)
                {
                    gps.Address = GetAddress(gps);
                }
                return gps;
            }
            catch (Exception  )
            {
                gps.Address = "未知";
               
                return gps;
            }
        }

        public Point TranslateGps84(double lat, double lng)
        {
            return PositionUtil.bd09_To_Gps84(lat, lng);
        }
    }
}
