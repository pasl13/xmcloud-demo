using Newtonsoft.Json.Linq;
using Sitecore.Data.Fields;
using Sitecore.XA.JSS.Feature.Navigation.ContentsResolvers;
using Sitecore.XA.JSS.Feature.Navigation.Models;
using System.Collections.Generic;

namespace XmCloudSXAStarter.Feature.Navigation.ContentsResolvers
{
    public class CustomNavigationContentResolver : NavigationContentResolver
    {
        protected override void AddFields(
           NavigationItemModel navigationItem,
           JObject navigationChildNode,
           IEnumerable<string> fields)
        {
            base.AddFields(navigationItem, navigationChildNode, fields);

            Field subtitleField = navigationItem.Item.Fields["Subtitle"];
            if (subtitleField != null && !string.IsNullOrEmpty(subtitleField.Value))
            {
                JToken subtitleJson = JToken.Parse(SerializeField(subtitleField));
                navigationChildNode.Add(subtitleJson.First);
            }
        }
    }
}
