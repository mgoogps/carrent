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
    public class Amap : IGeocoding
    {
        public string key
        {
            get
            {
                return "7536d5592589bd22c9788127b306b5e3";
            }
        }

        public string GetAddress(Point gps)
        {
            try
            { 
                //高德地图 Georegeo API
                //http://lbs.amap.com/api/webservice/guide/api/georegeo
                string jsonLocation = "";
                DAL.MgooWebClient wc = new DAL.MgooWebClient();
                wc.Method = "GET";
                wc.Url = "http://restapi.amap.com/v3/geocode/regeo?output=json&location=" + gps.Lat + "," + gps.Lng + "&key=" + key + "&radius=1000&extensions=all";
                jsonLocation = wc.Send();
                //"{\"status\":\"1\",\"info\":\"OK\",\"infocode\":\"10000\",\"regeocode\":{\"formatted_address\":\"广东省中山市南朗镇华峰路\",\"addressComponent\":{\"country\":\"中国\",\"province\":\"广东省\",\"city\":\"中山市\",\"citycode\":\"0760\",\"district\":[],\"adcode\":\"442000\",\"township\":\"南朗镇\",\"towncode\":\"442000113000\",\"neighborhood\":{\"name\":[],\"type\":[]},\"building\":{\"name\":[],\"type\":[]},\"streetNumber\":{\"street\":\"华峰路\",\"number\":\"15号\",\"location\":\"113.509635,22.5109078\",\"direction\":\"东北\",\"distance\":\"31.9644\"},\"businessAreas\":[[]]}}}"
                Dictionary<string, object> addressDic = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonLocation);
                if (addressDic["status"].Equals("1"))
                {
                    JObject regocode = (JObject)addressDic["regeocode"];

                    //var regocode = addressDic["regeocode"] as Dictionary<string, object> ;

                    var formatted_address = regocode["formatted_address"].ToString(); //地址 
                    var pois = (JArray)regocode["pois"];// as List<Dictionary<string, string>>;  //地址附近的POI数组，当请求的extensions 等于all 时才有
                    if (pois.Count > 0)
                    {
                        var pois_first = pois[0];
                        var pois_first_name = pois_first["name"].ToString();
                        var pois_first_direction = pois_first["direction"].ToString(); //方向
                        var pois_first_distance = pois_first["distance"].ToString(); //该POI到请求坐标的距离(米)

                        if (formatted_address.EndsWith(pois_first_name) && pois.Count > 1)
                        {
                            pois_first = pois[1];
                            pois_first_name = pois_first["name"].ToString();
                            pois_first_direction = pois_first["direction"].ToString(); //方向
                            pois_first_distance = pois_first["distance"].ToString(); //该POI到请求坐标的距离(米)
                        }
                        formatted_address += ",离" + pois_first_name + "(" + pois_first_direction + ")约" + Convert.ToDouble(pois_first_distance).ToString("0") + "米";
                    }
                    return formatted_address;
                } else if (addressDic["status"].Equals("10003")) {
                    //访问已超出日访问量
                    //开发者的日访问量超限，被系统自动封停，第二天0: 00会自动解封。
                    var path = System.AppDomain.CurrentDomain.BaseDirectory + "/amap.log";
                    File.AppendAllText(path, DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff")+"   访问已超出日访问量" + Environment.NewLine);
                    return "DAILY_QUERY_OVER_LIMIT";
                }
                else
                {
                    return "未获取到地址信息";
                }   
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Point Translate(double lat, double lng, bool address = false)
        { 
            Point gps;
            if (lat == -1.0 && lat == -1.0)
            {
                gps = new Point(-1.000, -1.000);
                gps.Address = "未解析到地址.";
                return gps;
            } 
            gps = PositionUtil.gps84_To_Gcj02(lat, lat);
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
            return PositionUtil.gcj_To_Gps84(lat , lng );
        }
    }
}
