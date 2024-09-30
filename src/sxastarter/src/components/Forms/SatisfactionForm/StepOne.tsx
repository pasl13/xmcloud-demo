import { useEffect, useState } from 'react';
import StepTwoNegative from './StepTwoNegative'; // Import StepTwoA component (adjust the path if needed)
import StepTwoPositive from './StepTwoPositive';
import { SatisfactionFormModel } from 'src/models/SatisfactionFormModel';

const StepOne = ({ props }: { props: SatisfactionFormModel }) => {
  const [satisfaction, setSatisfaction] = useState<string>(''); // Store button click value
  const [showStepTwoNegative, setShowStepTwoNegative] = useState<boolean>(false); // Track if we should show the next step
  const [showStepTwoPositive, setShowStepTwoPositive] = useState<boolean>(false); // Track if we should show the next step
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const submitted = localStorage.getItem(window.location.href);
    if (submitted === 'true') {
      setIsFormSubmitted(true);
    }
  }, []);
  const handleSatisfactionPositiveClick = (value: string) => {
    const formatedDate = formatDate(new Date());
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    setSatisfaction(value);
    createSitecoreItem(formatedDate, randomNumber);
    localStorage.setItem(window.location.href, 'true');
    setShowStepTwoPositive(true);
  };
  const handleSatisfactionNegativeClick = (value: string) => {
    setSatisfaction(value);
    setShowStepTwoNegative(true);
  };
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
  };
  const createSitecoreItem = async (dateTime: string, answerId: number) => {
    const query = `
      mutation {
        createItem(
          input: {
            name: "${dateTime}${answerId}",
            templateId: "{3D5EBC96-E281-4560-AE5E-34A518D63A1F}",
            parent: "{04C4919A-A51B-4ACF-A2A0-CD680CDF4A55}",
            language: "en",
            fields: [
              { name: "Page", value: "${window.location.href}" },
              { name: "MainAnswer", value: "${props.fields.PositiveButton.value}" },
              { name: "SecondaryAnswer", value: "" },
              { name: "Date", value: "${dateTime}" }
            ]
          }
        ) {
          item {
            itemId
            name
            path
            fields(ownFields: true, excludeStandardFields: true) {
              nodes {
                name
                value
              }
            }
          }
        }
      }
    `;

    const response = await fetch(
      'https://xmc-noesis136a1-demob96b-devteamd85c.sitecorecloud.io/sitecore/api/authoring/graphql/v1',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpnbnhyQk9IaXJ0WXp4dnl1WVhNZyJ9.eyJodHRwczovL2F1dGguc2l0ZWNvcmVjbG91ZC5pby9jbGFpbXMvb3JnX2lkIjoib3JnX3VCTllMUGNrS293QzQ4aWgiLCJodHRwczovL2F1dGguc2l0ZWNvcmVjbG91ZC5pby9jbGFpbXMvb3JnX25hbWUiOiJub2VzaXMtMSIsImh0dHBzOi8vYXV0aC5zaXRlY29yZWNsb3VkLmlvL2NsYWltcy9vcmdfZGlzcGxheV9uYW1lIjoiTm9lc2lzIiwiaHR0cHM6Ly9hdXRoLnNpdGVjb3JlY2xvdWQuaW8vY2xhaW1zL29yZ19hY2NvdW50X2lkIjoiMDAxM20wMDAwMmt2b0x3QUFJIiwiaHR0cHM6Ly9hdXRoLnNpdGVjb3JlY2xvdWQuaW8vY2xhaW1zL29yZ190eXBlIjoicGFydG5lciIsImh0dHBzOi8vYXV0aC5zaXRlY29yZWNsb3VkLmlvL2NsYWltcy9lbWFpbCI6ImpvYW8uYS5hbG1laWRhQG5vZXNpcy5wdCIsImh0dHBzOi8vYXV0aC5zaXRlY29yZWNsb3VkLmlvL2NsYWltcy9yb2xlcyI6WyJbR2xvYmFsXVxcRXZlcnlvbmUiLCJbT3JnYW5pemF0aW9uXVxcT3JnYW5pemF0aW9uIEFkbWluIl0sImh0dHBzOi8vYXV0aC5zaXRlY29yZWNsb3VkLmlvL2NsYWltcy9jbGllbnRfbmFtZSI6IlhNIENsb3VkIERlcGxveSAoQ0xJKSIsImlzcyI6Imh0dHBzOi8vYXV0aC5zaXRlY29yZWNsb3VkLmlvLyIsInN1YiI6ImF1dGgwfDY2MWZlOTk4OTNmYTBjZWExMGEyZjdlYyIsImF1ZCI6WyJodHRwczovL2FwaS5zaXRlY29yZWNsb3VkLmlvIiwiaHR0cHM6Ly9vbmUtc2MtcHJvZHVjdGlvbi5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzI3NjQxMDcyLCJleHAiOjE3Mjc3Mjc0NzIsInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUgb2ZmbGluZV9hY2Nlc3MgaWRlbnRpdHkudXNlcjpyZWFkIGlkZW50aXR5LnVzZXI6dXBkYXRlIGlkZW50aXR5LnVzZXJfb3JnYW5pemF0aW9uczpyZWFkIGJhY2tib25lLmV2ZW50czpyZWFkIGNvbm5lY3QudG9rZW5zOmNyZWF0ZSBjb25uZWN0LnBvcnRhbDpyZWFkIHBsYXRmb3JtLnJlZ2lvbnM6bGlzdCBpZGVudGl0eS51c2VyX3JvbGVzOnJlYWQgaWRlbnRpdHkub3JnYW5pemF0aW9uOnJlYWQgaWRlbnRpdHkub3JnYW5pemF0aW9uOnVwZGF0ZSBpZGVudGl0eS5vcmdhbml6YXRpb25faW52aXRhdGlvbnM6bGlzdCBpZGVudGl0eS5vcmdhbml6YXRpb25faW52aXRhdGlvbnM6Y3JlYXRlIGlkZW50aXR5Lm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9uczpyZWFkIGlkZW50aXR5Lm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9uczpkZWxldGUgaWRlbnRpdHkub3JnYW5pemF0aW9uX21lbWJlcnM6bGlzdCBpZGVudGl0eS5vcmdhbml6YXRpb25fbWVtYmVyczpyZWFkIGlkZW50aXR5Lm9yZ2FuaXphdGlvbl9tZW1iZXJzOmRlbGV0ZSBpZGVudGl0eS5vcmdhbml6YXRpb25fbWVtYmVyc19yb2xlczpjcmVhdGUgaWRlbnRpdHkub3JnYW5pemF0aW9uX21lbWJlcnNfcm9sZXM6ZGVsZXRlIGlkZW50aXR5LnJvbGVzOmxpc3QgaWRlbnRpdHkucm9sZXM6cmVhZCBpZGVudGl0eS5vcmdfY29ubmVjdGlvbnM6cmVhZCBpZGVudGl0eS5vcmdfY29ubmVjdGlvbnM6d3JpdGUgeG1jbG91ZGRlcGxveS5wcm9qZWN0czptYW5hZ2UgeG1jbG91ZGRlcGxveS5lbnZpcm9ubWVudHM6bWFuYWdlIHhtY2xvdWRkZXBsb3kub3JnYW5pemF0aW9uczptYW5hZ2UgeG1jbG91ZGRlcGxveS5kZXBsb3ltZW50czptYW5hZ2UgeG1jbG91ZGRlcGxveS5tb25pdG9yaW5nLmRlcGxveW1lbnRzOnJlYWQgeG1jbG91ZGRlcGxveS5jbGllbnRzOm1hbmFnZSB4bWNsb3VkZGVwbG95LnNvdXJjZWNvbnRyb2w6bWFuYWdlIHhtY2xvdWRkZXBsb3kucmg6bW5nIHhtY2xvdWRkZXBsb3kuc2l0ZTptbmcgeG1jbG91ZC5jbTphZG1pbiB4bWNsb3VkLmNtOmxvZ2luIGNvbm5lY3Qud2ViaG9va3M6cmVhZCBjb25uZWN0LndlYmhvb2tzOmNyZWF0ZSBjb25uZWN0LndlYmhvb2tzOnVwZGF0ZSBjb25uZWN0LndlYmhvb2tzOmRlbGV0ZSBwbGF0Zm9ybS50ZW5hbnRzOmxpc3RhbGwgYmFja2JvbmUuZXZlbnRzOmVuYWJsZSBiYWNrYm9uZS5ldmVudHM6ZGlzYWJsZSBiYWNrYm9uZS5hdWRpdDpyZWFkIGJhY2tib25lLnNvdXJjZWtleXM6Y3JlYXRlIGJhY2tib25lLnNvdXJjZWtleXM6cmVhZCBiYWNrYm9uZS5zb3VyY2VrZXlzOmRlbGV0ZSB1aS5leHRlbnNpb25zOnJlYWQgZWRnZS50b2tlbnM6Y3JlYXRlIGVkZ2UudG9rZW5zOnJlYWQgZWRnZS50b2tlbnM6ZGVsZXRlIGVkZ2UudG9rZW5zOnVwZGF0ZSBoYy5tZ21udC50eXBlczp3cml0ZSBoYy5tZ21udC5hcGlrZXlzOm1hbmFnZSBoYy5tZ21udC50eXBlczpyZWFkIGhjLm1nbW50Lm1lZGlhOm1hbmFnZSBoYy5tZ21udC5zdGF0ZXM6cHVibGlzaCBoYy5tZ21udC5pdGVtczptYW5hZ2UgaGMubWdtbnQudXNlcnM6cmVhZCBoYy5tZ21udC5jbGllbnRzOnJlYWQgaGMubWdtbnQudGF4b25vbWllczpyZWFkIGhjLm1nbW50LnRheG9ub21pZXM6d3JpdGUgaGMubWdtbnQubG9jYWxlczpyIGhjLm1nbW50LmxvY2FsZXM6dyBoYy5tZ21udC5zZXR0aW5nczpyIGhjLm1nbW50LnNldHRpbmdzOm0gbW1zLnVwbG9hZC5maWxlOmFkZCBtbXMudXBsb2FkLmZpbGU6cmVtb3ZlIGJhY2tib25lLmNvbnRhY3Q6cHVibGlzaCBiYWNrYm9uZS5jb250YWN0OnN1YnNjcmliZSBiYWNrYm9uZS5zZXNzaW9uOnB1Ymxpc2ggYmFja2JvbmUuc2Vzc2lvbjpzdWJzY3JpYmUgYmFja2JvbmUub3JkZXI6cHVibGlzaCBiYWNrYm9uZS5vcmRlcjpzdWJzY3JpYmUgYmFja2JvbmUub3JkZXJsaW5lOnB1Ymxpc2ggYmFja2JvbmUub3JkZXJsaW5lOnN1YnNjcmliZSBiYWNrYm9uZS5wYWdlOnB1Ymxpc2ggYmFja2JvbmUucGFnZTpzdWJzY3JpYmUgYmFja2JvbmUucHJvZHVjdDpwdWJsaXNoIGJhY2tib25lLnByb2R1Y3Q6c3Vic2NyaWJlIGJhY2tib25lLmN1c3RvbTpwdWJsaXNoIGJhY2tib25lLmN1c3RvbTpzdWJzY3JpYmUgY21wLnNpdGVzOmNyZWF0ZSBjbXAuc2l0ZXM6cmVhZCBjbXAuY29sbGVjdGlvbnM6Y3JlYXRlIGNtcC5jb2xsZWN0aW9uczpyZWFkIGNtcC5jb2xsZWN0aW9uczpkZWxldGUgY21wLmNvbXBvbmVudHM6Y3JlYXRlIGNtcC5jb21wb25lbnRzOnJlYWQgY21wLmNvbXBvbmVudHM6ZGVsZXRlIGNtcC5kYXRhc291cmNlczpjcmVhdGUgY21wLmRhdGFzb3VyY2VzOnJlYWQgY21wLmRhdGFzb3VyY2VzOmRlbGV0ZSBjbXAuc3R5bGVzOnJlYWQgY21wLnN0eWxlczp1cGRhdGUgY21wLnN0eWxlczpkZWxldGUgY21wLnByb3h5OnJlYWQgY21wLmJsb2JzOmNyZWF0ZSBzdXBwb3J0LnRpY2tldHM6Y3JlYXRlIHNlYXJjaC5wb3J0YWw6bWFuYWdlIHNlYXJjaC5kaXNjb3ZlcjptYW5hZ2Ugc2VhcmNoLmFkbWluOm1hbmFnZSBzZWFyY2guaW50ZXJuYWw6bWFuYWdlIHNlYXJjaC51dGlsOm1hbmFnZSBzZWFyY2guYWNjb3VudDptYW5hZ2UgZGlzY292ZXIucG9ydGFsOm1hbmFnZSBkaXNjb3Zlci5zZWFyY2gtcmVjOm1hbmFnZSBkaXNjb3Zlci5hZG1pbjptYW5hZ2UgZGlzY292ZXIuaW50ZXJuYWw6bWFuYWdlIGRpc2NvdmVyLnV0aWw6bWFuYWdlIGRpc2NvdmVyLmV2ZW50Om1hbmFnZSBkaXNjb3Zlci5hY2NvdW50Om1hbmFnZSBmb3Jtcy5lbmRwb2ludHM6cmVhZCBmb3Jtcy5lbmRwb2ludHM6Y3JlYXRlIGZvcm1zLmVuZHBvaW50czp1cGRhdGUgZm9ybXMuZW5kcG9pbnRzOmRlbGV0ZSBmb3Jtcy5zdWJtaXNzaW9uczpyZWFkIGZvcm1zLnN1Ym1pc3Npb25zOmNyZWF0ZSBmb3Jtcy5zdWJtaXNzaW9uczp1cGRhdGUgZm9ybXMuc3VibWlzc2lvbnM6ZGVsZXRlIGZvcm1zLmV4cG9ydHM6Y3JlYXRlIGZvcm1zLmV4cG9ydHM6cmVhZCBhdWRpdC5sb2dzOnIgY29ubmVjdC5vcmc6ciBjb25uZWN0Lm9yZy50bnQ6ciBjb25uZWN0LnJjcDpjIGNvbm5lY3QucmNwOnIgY29ubmVjdC5yY3A6dSBjb25uZWN0LnJjcDpkIGNvbm5lY3QuY29uOmMgY29ubmVjdC5jb246ciBjb25uZWN0LmNvbjp1IGNvbm5lY3QuY29uOmQgY29ubmVjdC5mbGRyOmMgY29ubmVjdC5mbGRyOnIgY29ubmVjdC5mbGRyOmQgY29ubmVjdC5sY2wuaW1wOmMgY29ubmVjdC5sY2wuaW1wOnIgY29ubmVjdC5sY2wuZXhwOmMgY29ubmVjdC5sY2wuZXhwOnIgY29ubmVjdC5wcm9qOnIgY29ubmVjdC5wcm9qOmQgZXAuYWRtbi5vcmdzLmhzdG5tZTpyIGVwLmFkbW4ub3Jncy5oc3RubWU6dyB4bWFwcHMuY29udGVudDpnZW4gYWkub3JnLmJyZDpyIGFpLm9yZy5icmQ6dyBhaS5vcmcuZWc6ciBhaS5vcmcuZWc6dyBhaS5vcmcuY2h0czpyIGFpLm9yZy5jaHRzOncgYWkub3JnLmRvY3M6ciBhaS5vcmcuZG9jczp3IGFpLmdlbi5jbXA6ciBhaS5nZW4uY21wOncgYWkucmVjLnZhcjp3IGFpLnJlYy52YXI6ciBhaS5yZWMuaHlwOncgYWkucmVjLmh5cDpyIGFpLm9yZzphZG1pbiBtbXMuZGVsaXZlcnk6ciBjcy5hbGw6ZWRpdG9yIGNzLmFsbDphZG1pbiIsImF6cCI6IkNoaThFd2ZGbkVlamtzazNTZWQ5aGxhbEdpTTlCMnY3In0.AfV2wz116Ebudkz_dHmR9RBpP_IKaxTDHsbuJTM7Kh7oidHLuvyBkPsZfx_b5HLqb6Q_OcMoHCwxpzvLzMK42yDJ7FNBGmaEDY077nGtyDjKcnMiWGOtxFe6vEFpllV0sgJQjuGBe2FUkXfYXCz9s4jVrt5m9JUQ84haS0HNdR_xSM0_GEJKSisQl2mMNy_GEjfn3jZu_viSnipluZ_bgSdZkqJKOprzF6nvximTpFI_6Z7HQ1rLKMhgkQ4fiFz1u6ny3KHMZ3woNloKVfi6yoUaax3H7CuwiOq8BPO9D61Xn9CaRvbHEmdvKSIwESYEtocjNMtdSZskMVxQvXzv5g', // Ensure 'myCode' is the correct token
        },
        body: JSON.stringify({ query }),
      }
    );

    const result = await response.json();

    // Handle the response from Sitecore
    if (response.ok) {
      setResponseMessage(`Item created with ID: ${result.data.createItem.item.itemId}`);
    } else {
      setResponseMessage('Failed to create item');
    }
  };

  return (
    <div>
      {/* Conditionally render Step One or Step Two */}
      {!showStepTwoNegative && !showStepTwoPositive && !isFormSubmitted ? (
        <div>
          <h2>{props.fields.Question.value}</h2>
          {/* Buttons for Yes and No */}
          {/* <Button {...args} /> */}
          <button
            onClick={() => handleSatisfactionPositiveClick(props.fields.PositiveButton.value)}
          >
            {props.fields.PositiveButton.value}
          </button>
          <button
            onClick={() => handleSatisfactionNegativeClick(props.fields.NegativeButton.value)}
          >
            {props.fields.NegativeButton.value}
          </button>
        </div>
      ) : showStepTwoNegative ? (
        <StepTwoNegative satisfaction={satisfaction} {...props} />
      ) : (
        <StepTwoPositive satisfaction={satisfaction} props={props} />
      )}
    </div>
  );
};

export default StepOne;
