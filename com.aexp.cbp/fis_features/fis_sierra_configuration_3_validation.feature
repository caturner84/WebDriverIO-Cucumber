Feature: FIS Sierra Configuration 3 validation
  This feature is to demonstrate how to validate the FIS Sierra configuration screens

  Background:
    Given I launch the sierra login page
    When I login to sierra using username and password
      | userName | password |
      | Caturner | P@$$W0rd |
    Then I should navigate to sierra home page

  Scenario Outline: Validate currency holiday tab

    When I click on currencies menu item
    And I click on currency holidays menu item
    And I select a currency "<currency>" and year "<year>"
    Then I should see the correct number of currency holidays "<numberOfHols>"
    And I should logout

  @fise0 @fise1 @fise2
    Examples:
      | currency | year | numberOfHols |
      | USD      | 2021 | 9            |
      | CHF      | 2021 | 5            |
      | AUD      | 2021 | 9            |
      | CAD      | 2021 | 11           |
      | EUR      | 2021 | 3            |
      | GBP      | 2021 | 8            |
      | HKD      | 2021 | 13           |
      | JPY      | 2021 | 16           |
      | MXN      | 2021 | 8            |
      | NZD      | 2021 | 12           |
      | SGD      | 2021 | 8            |
      | ZAR      | 2021 | 10           |

  Scenario Outline: Validate Filter Templates

    When I click on Filter Templates menu item
    And I select Filter Type "<filterType>"
    Then The Template Name dropdown should contain "<templateName>"

  @fise0
    Examples:
      | filterType                           | templateName                                                                                                            |
      | Accounting Filter Templates          | EODGLEXP,EODGLGEN                                                                                                       |
      | Back Office Processing               | ANFT,CON-DEMO,EN_TRADE,EN_US_CI,ENRCH LP,ENRCH-AU,ENRCH_CI,PAY AUTO,PAY-DEMO,PAYMENT,SA AUTO,SET_AUTH,TRD_CONF,YPDBOATM |
      | Accounting Blotter - Entries Mode    | TOD-ENTR                                                                                                                |
      | Notification Setup - Limits Internal | LImitis,Net CcyP,OvrLimit                                                                                               |
      | Spot/Forward Closer                  | ANTF,GLcloser,LP Close,LP Spot,MK test,UScloser,YPDSFrw                                                                 |
      | Trader Workspace                     | AN,ASTW,FXTRADNG,Global,LECHU1,LPFILTE1,MK Books,POMS CPs,US-Local,YPD2                                                 |

  @fise1
    Examples:
      | filterType                           | templateName                                                                                                            |
      | Accounting Filter Templates          | EODGLEXP,EODGLGEN                                                                                                       |
      | Back Office Processing               | EN_TRADE,EN_US_CI,ENRCH_AU,ENRCH_CI,PAY AUTO,PAYMENT,SA AUTO,SET_AUTH,TRD_CONF                                          |
      | Accounting Blotter - Entries Mode    | TOD-ENTR                                                                                                                |
      | Notification Setup - Limits Internal | Net CcyP,OvrLimit,Threshol                                                                                              |
      | Spot/Forward Closer                  | GLcloser,UScloser                                                                                                       |
      | Trader Workspace                     | FxTrades,FXTRADNG,GLOBAL,POMS CPs,US-Local                                                                              |

  @fise2
    Examples:
      | filterType                           | templateName                                                                                                            |
      | Accounting Filter Templates          | EODGLEXP,EODGLGEN,EODGLTB1,EODSTAA1                                                                                     |
      | Back Office Processing               | EN_TRADE,EN_US_CI,ENR-Test,ENRCH_AU,ENRCH_CI,PAY AUTO,PAYMENT,SA AUTO,SET_AUTH,TRD_CONF                                 |
      | Accounting Blotter - Entries Mode    | TOD-ENTR                                                                                                                |
      | Spot/Forward Closer                  | GLcloser,UScloser                                                                                                       |
      | Trader Workspace                     | FXTRADNG,Global,POMS CPs,Temp YPD,US-Local                                                                              |

  @NotCompleted
  Scenario Outline: Validate fx rates

    When I click on fx rates menu item
    Then I should see the fx rates page
    When I select currency "<currency>"
    Then I should currency info and other rate information
    When I click on tenors
    Then I should see the correct tenors selected

    Examples:
      | currency |
      | USD      |
