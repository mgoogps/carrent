using System;
using System.Device.Location; 

namespace Mgoo.CarRent.Position
{
   public class ZCChinaLocation
    {
        /// <summary>
        /// 判断点是否在中国大陆境内，边境地区可能不太准确
        /// http://www.exlive.cn/home/updatePage/main.jsp?type=-1&content=true&id=1013
        /// </summary>
        /// <param name="dbLatitude">纬度</param>
        /// <param name="dbLongitude">经度</param>
        /// <returns></returns>
        public static bool InOutChina(double dbLatitude, double dbLongitude)
        {
            double[,] inChina = new double[6, 4] {
                 {49.220400, 79.446200, 42.889900, 96.330000},
                 {54.141500,109.687200,39.374200,135.000200},
                 {42.889900,073.124600,29.529700,124.143255},
                 {29.529700,082.968400,26.718600,097.035200},
                 {29.529700,097.025300,20.414096,124.367395},
                 {20.414096,107.975793,17.871542,111.744104},
            };
            double[,] outChina = new double[6, 4] {
                 {25.398623,119.921265,21.785006,122.497559},
                 {22.284000,101.865200,20.098800,106.665000},
                 {21.542200,106.452500,20.487800,108.051000},
                 {55.817500,109.032300,50.325700,119.127000},
                 {55.817500,127.456800,49.557400,137.022700},
                 {44.892200,131.266200,42.569200,137.022700},
            };
            for (int i = 0; i < 6; i++)
            {
                if (dbLatitude <= inChina[i, 0] && dbLatitude >= inChina[i, 2] && dbLongitude >= inChina[i, 1] && dbLongitude <= inChina[i, 3])
                {
                    for (int j = 0; j < 6; j++)
                    {
                        if (dbLatitude <= outChina[j, 0] && dbLatitude >= outChina[j, 2] && dbLongitude >= outChina[j, 1] && dbLongitude <= outChina[j, 3])
                        {
                            return false;
                        }
                    }
                    return true;
                }
            }
            return false;
        }
    
       
    }
}
