using Mgoo.CarRent.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace Mgoo.CarRent.Common
{
    public class SMSHelper
    {
        /// <summary>
        /// 发送短信
        /// </summary>
        /// <param name="phone"></param>
        /// <param name="content"></param>
        /// <returns></returns>
        public static IApiResult Send(string phone,string content)
        {
            //{
            //    "account" : "N6000001", //API账号，50位以内。必填
            //    "password" : "12345678", //API账号对应密钥，联系客服获取。必填
            //    "msg" : "【253】您的验证码是：2530", //短信内容。长度不能超过536个字符。必填
            //    "mobile" : "8615800000000" //手机号码，格式(区号+手机号码)，例如：8615800000000，其中86为中国的区号，区号前不使用00开头,15800000000为接收短信的真实手机号码。5-20位。必填
            //}
            IApiResult ar = new IApiResult();
            string url = "http://intapi.253.com/send/json";
            int SecurityCode = new Random().Next(100000, 999999);
            var pars = new
            {
                account = Lib.Config.SMS.CHUANLAN_ACCOUNT,
                password = Lib.Config.SMS.CHUANLAN_PASSWORD,
                msg = Lib.Config.SMS.SIGNATURE+ content,
                mobile = phone
            };
            //StringBuilder sb = new StringBuilder();
            //sb.Append("{\"account\":\"" + pars.account+"\",");
            //sb.Append("\"password\":\"" + pars.password + "\",");
            //sb.Append("\"msg\":\"" + pars.msg + "\",");
            //sb.Append("\"mobile\":\"" + pars.mobile+"\" }" );
            //Dictionary<string, string> a = new Dictionary<string, string>();
            var json = JsonHelper.ToJson(pars);
            var result  = HttpService.Post(url, json);
            var resDic = JsonHelper.ToObject<Dictionary<string,string>>(result);
            //{ "code": "0",    "error": "",  "msgid": "17092215311000564791"}
            //响应代码参照 https://www.showdoc.cc/1621091?page_id=14901229
            if (resDic["code"].Equals("0"))
            {
                //验证码发送成功后，保存状态20分钟
                CacheHelper.Insert(Lib.Config.SMS.PREFIX + ""+phone,SecurityCode,20);
                ar.message = "success!";
            }
            else
            {
                ar.code = StatusCode.failure;
                ar.message = "send failure!";
            }
            return ar;
        }
    }
}
