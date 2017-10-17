using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Common
{
    public class Command
    {
        public static string SendTcpCmd(string cmd, string ServerID = null)
        {
            Socket clientSocket = null;
            try
            {
                string sid = "1";
                if (string.IsNullOrEmpty(ServerID))
                {
                    string imeiOrDeviceID = cmd.Split('-')[2]; //IMEI号 或者 DeviceID
                    if (string.IsNullOrEmpty(imeiOrDeviceID))
                    {
                        sid = "1";
                       // Utils.log("SendTcpCmd Error: cmd:" + cmd);
                    }
                    else
                    {
                        string strSql = "select ServerID from devices where SerialNumber='" + imeiOrDeviceID + "' or DeviceID=" + imeiOrDeviceID;
                       // MG_DAL.SQLServerOperating s = new MG_DAL.SQLServerOperating();
                       // sid = s.Select(strSql);
                    }
                }
                else
                {
                    sid = ServerID;
                }
                string configName = "tcpIP" + sid;

                int port = Convert.ToInt32(ConfigurationManager.AppSettings["tcpPort"]); // 7700;
                string host = ConfigurationManager.AppSettings[configName].ToString();  //"120.24.78.26";//服务器端ip地址

                IPAddress ip = IPAddress.Parse(host);
                IPEndPoint ipe = new IPEndPoint(ip, port);

                clientSocket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);

                clientSocket.SendTimeout = 3000;
                clientSocket.Connect(ipe);

                //send message 
                byte[] sendBytes = Encoding.ASCII.GetBytes(cmd);
                clientSocket.BeginSend(sendBytes, 0, sendBytes.Length, SocketFlags.None, null, null);

                //receive message
                string recStr = "";
                byte[] recBytes = new byte[2];
                int bytes = clientSocket.Receive(recBytes, recBytes.Length, 0);
                recStr += Encoding.ASCII.GetString(recBytes, 0, bytes);
                return recStr;
            }
            catch (Exception ex)
            {
                //Utils.log("SendTcpCmd Error:" + ex.Message + "," + cmd);
                return "0";
            }
            finally
            {
                if (clientSocket != null)
                    clientSocket.Close();
            }
        }

    }
}
