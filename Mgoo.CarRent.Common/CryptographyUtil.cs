using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace Mgoo.CarRent.Common
{
    public class CryptographyUtil
    {
        /// <summary>
        /// MD5加密
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string GetMD5(string str)
        {
            byte[] bytes = MD5.Create().ComputeHash(Encoding.UTF8.GetBytes(str));
            return BitConverter.ToString(bytes).Replace("-", "").ToLower();
        }
        /// <summary>
        /// sha1 加密
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string GetSha1(string str)
        {
            //建立SHA1对象
            SHA1 sha = new SHA1CryptoServiceProvider();
            //将mystr转换成byte[] 
            ASCIIEncoding enc = new ASCIIEncoding();
            byte[] dataToHash = enc.GetBytes(str);
            //Hash运算
            byte[] dataHashed = sha.ComputeHash(dataToHash);
            //将运算结果转换成string
            string hash = BitConverter.ToString(dataHashed).Replace("-", "");
            return hash;
        }
        /// <summary>
        /// 把string类型base64格式的数据，转成图片
        /// </summary>
        /// <param name="base64"></param>
        /// <returns></returns>
        public static string Base64ToImage(string base64)
        {
            try
            {
                if (string.IsNullOrEmpty(base64))
                {
                    return string.Empty;
                }
                string filename = DateTime.Now.Ticks + new Random().Next(1, 10000) + ".png";
                byte[] arr = Convert.FromBase64String(base64);
              
                Log.Debug("Base64ToImage>", "大小："+arr.Length);
                if (arr.Length > 2048 * 1024)
                {

                }
                using (System.IO.MemoryStream ms = new System.IO.MemoryStream(arr))
                {
                    System.Drawing.Bitmap bmp = new System.Drawing.Bitmap(ms);
                    System.Drawing.Bitmap bmp2 = bmp;// new System.Drawing.Bitmap(500 ,500, System.Drawing.Imaging.PixelFormat.Format16bppRgb555);

                    System.Drawing.Graphics draw = System.Drawing.Graphics.FromImage(bmp2);
                    draw.DrawImage(bmp, new System.Drawing.Rectangle(0, 0, bmp.Width, bmp.Height));
                    draw.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.High;

                    //设置高质量,低速度呈现平滑程度
                    draw.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
                    string path = System.AppDomain.CurrentDomain.BaseDirectory + @"/FeedbackImage/";
                    // string filename = DateTime.Now.Ticks + new Random().Next(1, 10000) + ".png";
                    DirectoryInfo dir = new DirectoryInfo(path);
                    if (!dir.Exists)
                    {
                      
                        dir.Create();
                    }
                    bmp2.Save(path + filename);
                    bmp.Dispose();
                    bmp2.Dispose();
                    return filename;
                }
            }
            catch (Exception ex)
            {
                Log.Error("Base64ToImage>", ex);
                return string.Empty;
            }
        }

    }
}
