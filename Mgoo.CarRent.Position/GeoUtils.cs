using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Position
{
   public class GeoUtils
    {
        /// <summary>
        /// 地球半径
        /// </summary>
        private static double EARTHRADIUS = 6370996.81;

        /// <summary>
        /// 判断点是否在圆形内
        /// </summary>
        /// <param name="point">要判断的坐标</param>
        /// <param name="circle">园的坐标</param>
        /// <param name="radius">园的半径</param>i
        /// <returns></returns>
        /// 
        public static bool isPointInCircle(Point point, Point circle, double radius)
        {
            var dis = getDistance(point, circle);
            if (dis <= radius)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        /// <summary>
        /// 计算两点之间的距离,两点坐标必须为经纬度
        /// </summary>
        /// <param name="point1">第一个坐标点</param>
        /// <param name="point2">第二个坐标点</param>
        /// <returns></returns>
        private static double getDistance(Point point1, Point point2)
        {
            point1.Lng = _getLoop(point1.Lng, -180, 180);
            point1.Lat = _getRange(point1.Lat, -74, 74);
            point2.Lng = _getLoop(point2.Lng, -180, 180);
            point2.Lat = _getRange(point2.Lat, -74, 74);
            double x1, x2, y1, y2;
            x1 = degreeToRad(point1.Lng);
            y1 = degreeToRad(point1.Lat);
            x2 = degreeToRad(point2.Lng);
            y2 = degreeToRad(point2.Lat);

            return EARTHRADIUS * Math.Acos((Math.Sin(y1) * Math.Sin(y2) + Math.Cos(y1) * Math.Cos(y2) * Math.Cos(x2 - x1)));
        }
        /// <summary>
        /// 将v值限定在a,b之间，经度使用
        /// </summary>
        /// <param name="v"></param>
        /// <param name="a"></param>
        /// <param name="b"></param>
        /// <returns></returns>
        private static double _getLoop(double v, double a, double b)
        {
            while (v > b)
            {
                v -= b - a;
            }
            while (v < a)
            {
                v += b - a;
            }
            return v;
        }
        /// <summary>
        /// 将v值限定在a,b之间，纬度使用
        /// </summary>
        /// <param name="v"></param>
        /// <param name="a"></param>
        /// <param name="b"></param>
        /// <returns></returns>
        private static double _getRange(double v, double a, double b)
        {
            v = Math.Max(v, a);

            v = Math.Min(v, b);

            return v;
        }
        /// <summary>
        /// 将度转化为弧度
        /// </summary>
        /// <param name="degree">度</param>
        /// <returns>弧度</returns>
        private static double degreeToRad(double degree)
        {
            return Math.PI * degree / 180;
        }

        /// <summary>
        ///  判断点是否在矩形内
        /// </summary>
        /// <param name="point">点对象</param>
        /// <param name="sw">西南脚点</param>
        /// <param name="ne">东北脚点</param>
        /// <returns>点在矩形内返回true,否则返回false</returns>
        private static bool isPointInRect(Point point, Point sw, Point ne)
        {
            return (point.Lng >= sw.Lng && point.Lng <= ne.Lng && point.Lat >= sw.Lat && point.Lat <= ne.Lat);
        }

        /// <summary>
        /// 判断点是否多边形内
        /// </summary>
        /// <param name="point">需要判断的点位置</param>
        /// <param name="pts">多边形点的集合</param>
        /// <param name="sw">西南角点</param>
        /// <param name="ne">东北脚点</param>
        /// <returns>点在多边形内返回true,否则返回false</returns>
        public static bool isPointInPolygon(Point point, List<Point> pts, Point sw, Point ne)
        {
            //首先判断点是否在多边形的外包矩形内，如果在，则进一步判断，否则返回false
            if (!isPointInRect(point, sw, ne))
            {
                return false;
            }
            var N = pts.Count;
            var boundOrVertex = true; //如果点位于多边形的顶点或边上，也算做点在多边形内，直接返回true
            var intersectCount = 0;//cross points count of x 
            float precision = 2e-10F; //浮点类型计算时候与0比较时候的容差
            Point p1, p2;//neighbour bound vertices
            var p = point; //测试点
            p1 = pts[0];//left vertex    
            for (int i = 0; i <= N; i++)//check all rays         
            {
                if (p.Equals(p1))
                {
                    return boundOrVertex;//p is an vertex
                }
                p2 = pts[i % N];//right vertex      
                if (p.Lat < Math.Min(p1.Lat, p2.Lat) || p.Lat > Math.Max(p1.Lat, p2.Lat))
                {//ray is outside of our interests                
                    p1 = p2;
                    continue;//next ray left point
                }
                if (p.Lat > Math.Min(p1.Lat, p2.Lat) && p.Lat < Math.Max(p1.Lat, p2.Lat))
                {//ray is crossing over by the algorithm (common part of)
                    if (p.Lng <= Math.Max(p1.Lng, p2.Lng))
                    {//x is before of ray                    
                        if (p1.Lat == p2.Lat && p.Lng >= Math.Min(p1.Lng, p2.Lng))
                        {//overlies on a horizontal ray
                            return boundOrVertex;
                        }

                        if (p1.Lng == p2.Lng)
                        {//ray is vertical                        
                            if (p1.Lng == p.Lng)
                            {//overlies on a vertical ray
                                return boundOrVertex;
                            }
                            else
                            {//before ray
                                ++intersectCount;
                            }
                        }
                        else
                        {//cross point on the left side                        
                            var xinters = (p.Lat - p1.Lat) * (p2.Lng - p1.Lng) / (p2.Lat - p1.Lat) + p1.Lng;//cross point of lng                        
                            if (Math.Abs(p.Lng - xinters) < precision)
                            {//overlies on a ray
                                return boundOrVertex;
                            }

                            if (p.Lng < xinters)
                            {//before ray
                                ++intersectCount;
                            }
                        }
                    }
                }
                else
                {//special case when ray is crossing through the vertex                
                    if (p.Lat == p2.Lat && p.Lng <= p2.Lng)
                    {//p crossing over p2                    
                        var p3 = pts[(i + 1) % N]; //next vertex                    
                        if (p.Lat >= Math.Min(p1.Lat, p3.Lat) && p.Lat <= Math.Max(p1.Lat, p3.Lat))
                        {//p.lat lies between p1.lat & p3.lat
                            ++intersectCount;
                        }
                        else
                        {
                            intersectCount += 2;
                        }
                    }
                }
                p1 = p2;//next ray left point
            }

            if (intersectCount % 2 == 0)
            {
                //偶数在多边形外
                return false;
            }
            else
            {
                //奇数在多边形内
                return true;
            }
        }
    }
  
}
