Feature: To validate CBP login when myca user is not enrolled

  Scenario Outline: Validate CBP login when myca user is not enrolled

    Given I launch the myca login page
    When I login to myca using username "<userName>" and password "<password>" using pin "<pinOrPassword>"
    Then I should be landing on error page

  @e1
    Examples:
      | userName   | password   | pinOrPassword |
      | tdim218293 | flower1234 |               |

  @e2PaymentDomain @e2PricingDomain @e2FundingDomain @e2ClientDomain @e2RecipientDomain @e2SettlementDomain @e2TradingDomain @e2DailyExecution
    Examples:
      | userName  | password   | pinOrPassword |
      | arn844534 | flower1234 |               |
