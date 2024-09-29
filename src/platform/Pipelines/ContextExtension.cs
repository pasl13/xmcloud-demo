using System.Collections.Generic;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Globalization;
using Sitecore.JavaScriptServices.Configuration;
using Sitecore.LayoutService.ItemRendering.Pipelines.GetLayoutServiceContext;

namespace XmCloudSXAStarter.Pipelines
{
    public class ContextExtension : Sitecore.JavaScriptServices.ViewEngine.LayoutService.Pipelines.GetLayoutServiceContext.JssGetLayoutServiceContextProcessor
    {
        public ContextExtension(IConfigurationResolver configurationResolver) : base(configurationResolver) { }

        protected override void DoProcess(GetLayoutServiceContextArgs args, AppConfiguration application)
        {
            Assert.ArgumentNotNull(args, "args");

            var langVersions = new List<Language>();

            Item tempItem = Sitecore.Context.Item;

            foreach (var itemLanguage in tempItem.Languages)
            {
                var item = tempItem.Database.GetItem(tempItem.ID, itemLanguage);

                if (item.Versions.Count > 0 || item.IsFallback)
                {
                    langVersions.Add(itemLanguage);
                }
            }

            args.ContextData.Add("Languages", langVersions);
        }
    }
}