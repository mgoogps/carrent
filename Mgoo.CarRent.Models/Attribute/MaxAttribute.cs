﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Models.Attribute
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class MaxAttribute : ValidationAttribute
    { 
        /// <summary>  
       ///     最大值  
       /// </summary>  
        public int MaximumValue { get; set; }
        /// <summary>  
        ///     构造函数  
        /// </summary>  
        /// <param name="minimun"></param>  
        public MaxAttribute(int minimun)
        {
            MaximumValue = minimun;
        }

        /// <summary>  
        ///     验证逻辑  
        /// </summary>  
        /// <param name="value">需验证的值</param>  
        /// <returns>是否通过验证</returns>  
        public override bool IsValid(object value)
        {
            int intValue;
            if (value != null && int.TryParse(value.ToString(), out intValue))
            {
                return (intValue <= MaximumValue);
            }
            return false;
        }
        /// <summary>  
        ///     格式化错误信息  
        /// </summary>  
        /// <param name="name">属性名称</param>  
        /// <returns>错误信息</returns>  
        public override string FormatErrorMessage(string name)
        {
            return string.Format("{0} 最大值为 {1}", name, MaximumValue);
        }
    }
}
