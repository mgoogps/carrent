using Mgoo.CarRent.Common;
using Mgoo.CarRent.Interface;
using Mgoo.CarRent.Position;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http; 

namespace Mgoo.CarRent.WebApi.Controllers
{
    /// <summary>
    /// 获取地址，坐标转换
    /// </summary>
    [AuthFilter( OnlyLogin = true)]
    public class PositionController :WebApiBaseClass
    {
        /// <summary>
        /// 经纬度转换
        /// </summary>
        /// <param name="position"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IApiResult> Translate(Models.Parameter.P_Position.PTranslate position)
        {
            return await ApiAsync(position, (p) =>
             {
                 return Task.Run(() =>
                 {
                     try
                     {
                         string[] str = position.coords.Split(',');
                         double lat = Convert.ToDouble(str[0]);
                         double lng = Convert.ToDouble(str[1]);
                         var msg = "Successful conversion.";
                         if (p.from == 2 && p.to == 3)
                         {
                             Point point = CarRent.Position.PositionUtil.gcj02_To_Bd09(lat, lng);
                             return new IApiResult() { result = new { lat = point.Lat, lng = point.Lng }, message = msg };
                         }
                         else if (p.from == 2 && p.to == 1)
                         {
                             Point point = CarRent.Position.PositionUtil.gcj_To_Gps84(lat, lng);
                             return new IApiResult() { result = new { lat = point.Lat, lng = point.Lng }, message = msg };
                         }
                         else if (p.from == 3 && p.to == 2)
                         {
                             Point point = CarRent.Position.PositionUtil.bd09_To_Gcj02(lat, lng);
                             return new IApiResult() { result = new { lat = point.Lat, lng = point.Lng }, message = msg };
                         }
                         else if (p.from == 3 && p.to == 1)
                         {
                             Point point = CarRent.Position.PositionUtil.bd09_To_Gps84(lat, lng);
                             return new IApiResult() { result = new { lat = point.Lat, lng = point.Lng }, message = msg };
                         }
                         else if (p.from == 1 && p.to == 2)
                         {
                             Point point = CarRent.Position.PositionUtil.gps84_To_Gcj02(lat, lng);
                             return new IApiResult() { result = new { lat = point.Lat, lng = point.Lng }, message = msg };
                         }
                         else if (p.from == 1 && p.to == 3)
                         {
                             Point point = CarRent.Position.PositionUtil.gps84_To_Bd09(lat, lng);
                             return new IApiResult() { result = new { lat = point.Lat, lng = point.Lng }, message = msg };
                         }
                     }
                     catch (Exception ex)
                     {
                         Log.Error(this,ex);
                         return new IApiResult() { code=  Interface.StatusCode.failure, message=ex.Message };
                     }
                     return new IApiResult() { code = Interface.StatusCode.failure, message = "Conversion failed." };
                 });
             });
        }

        /// <summary>
        /// 获取地址
        /// </summary>
        /// <param name="point"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IApiResult> GetAddress(Models.Parameter.P_Position.PGetAddress point)
        {
            return await ApiAsync(point, (p) =>
            {
                return Task.Run(() =>
                {
                    try
                    {
                        string address = "";
                        if (p.type == "AMAP")
                        {
                            IGeocoding map = new Position.Geocod.Amap();
                            address = map.GetAddress(new Point(p.lat, p.lng));
                        }
                        else if (p.type == "BAIDU")
                        {
                            IGeocoding map = new Position.Geocod.Baidu();
                            address = map.GetAddress(new Point(p.lat, p.lng));
                        }
                        else if (p.type == "GOOGLE")
                        {
                            Position.Geocod.Google map = new Position.Geocod.Google();
                            map.language = p.language;
                            address = map.GetAddress(new Point(p.lat, p.lng));
                        }
                        if (address == "")
                        {
                            return new IApiResult() { code = Interface.StatusCode.failure, message = "type error..." };
                        }
                        return new IApiResult() { code = Interface.StatusCode   .success, message = "Get the address successfully.", result = address };
                    }
                    catch (Exception ex)
                    {
                        Log.Error(this,ex);
                        return new IApiResult() { code = Interface.StatusCode.error, message = ex.Message  };
                    }
                });
            });
        }
        /// <summary>
        /// 判断坐标是否在中国境内
        /// </summary>
        /// <param name="lat"></param>
        /// <param name="lng"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IApiResult> InOutChina(double lat,double lng)
        {
            return await ApiAsync(()=> 
            {
                return Task.Run(() => 
                {
                    bool isChina = ZCChinaLocation.InOutChina(lat, lng);
                    return new IApiResult() { code = Interface.StatusCode.success, message = isChina ? "在中国境内." : "不在中国境内", result = new { isChina = isChina } };
                }); 
            });
        }
    }
}
