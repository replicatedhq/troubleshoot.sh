import * as React from "react";
import "../scss/components/TroubleshootLifecycle.scss";

export default function TroubleshootLifecycle({ isMobile }) {
  if (isMobile) {
    return (
      <div>
        <div className="flex alignItems--center">
          <div className="step-number flex-auto">1</div>
          <div className="tbl-lifecycle-block troubleshoot flex flex1">
            <div className="flex-auto u-marginRight--20">
              <span className="icon tblshoot-yaml-doc" />
            </div>
            <div>
              <div style={{ width: `156px`, height: `15px` }} className="troubleshoot-logo" />
              <p className="u-fontSize--normal u-color--tundora u-lineHeight--more u-fontWeight--normal u-marginTop--10 body-copy">Start by codifying what you want to collect and analyze.</p>
            </div>
          </div>
        </div>

        <div className="step add-spec u-paddingTop--10 u-paddingBottom--10">
          <div className="flex alignItems--center step-content">
            <span className="icon add-blue-icon" />
            <p className="u-fontSize--small u-marginLeft--10 u-fontWeight--medium u-color--dustyGray u-lineHeight--normal">Add preflights</p>
          </div>
        </div>

        <div className="flex alignItems--center">
          <div className="step-number flex-auto">2</div>
          <div className="tbl-lifecycle-block preflight flex">
            <div className="flex-auto u-marginRight--10">
              <span className="icon preflight-small" />
            </div>
            <div>
              <p className="u-fontSize--large u-color--biscay u-lineHeight--default">Preflight check</p>
              <p className="u-fontSize--normal u-color--tundora u-lineHeight--more u-fontWeight--normal u-marginTop--10 body-copy">Checks are used to validate ENV before installation.</p>
            </div>
          </div>
        </div>

        <div className="step checks-pass u-paddingTop--10 u-paddingBottom--10">
          <div className="flex alignItems--center step-content">
            <span className="icon green-checkmark-icon" />
            <p className="u-fontSize--small u-marginLeft--10 u-fontWeight--medium u-color--dustyGray u-lineHeight--normal">Checks pass</p>
          </div>
        </div>

        <div className="flex alignItems--center">
          <div className="step-number flex-auto">3</div>
          <div className="tbl-lifecycle-block deploy-app flex">
            <div className="flex-auto u-marginRight--20">
              <span className="icon deploy-app-icon" />
            </div>
            <div>
              <p className="u-fontSize--large u-color--biscay u-lineHeight--default">Deploy your app</p>
              <p className="u-fontSize--normal u-color--tundora u-lineHeight--more u-fontWeight--normal u-marginTop--10 body-copy">Application is deployed to your customers.</p>
            </div>
          </div>
        </div>

        <div className="step customer-issue u-paddingTop--10 u-paddingBottom--10">
          <div className="flex alignItems--center step-content">
            <span className="icon red-warning-icon" />
            <p className="u-fontSize--small u-marginLeft--10 u-fontWeight--medium u-color--dustyGray u-lineHeight--normal">Customer issue</p>
          </div>
        </div>

        <div className="flex alignItems--center">
          <div className="step-number flex-auto">4</div>
          <div className="tbl-lifecycle-block support flex">
            <div className="flex-auto u-marginRight--10">
              <span className="icon support-small" />
            </div>
            <div>
              <p className="u-fontSize--large u-color--biscay u-lineHeight--default">Support</p>
              <p className="u-fontSize--normal u-color--tundora u-lineHeight--more u-fontWeight--normal u-marginTop--10 body-copy">Collectors are used to debug when errors occur.</p>
            </div>
          </div>
        </div>

        <div className="step repeat-cycle u-paddingTop--10">
          <div className="flex alignItems--center step-content">
            <span className="icon repeat-cycle-icon" />
            <p className="u-fontSize--small u-marginLeft--10 u-fontWeight--medium u-color--dustyGray u-lineHeight--normal">Repeat cycle</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <span className="icon tblshoot-icon-only" />
        <div className="tbl-lifecycle-block troubleshoot flex">
          <div className="flex-auto u-marginRight--20">
            <span className="icon tblshoot-yaml-doc" />
          </div>
          <div>
            <div style={{ width: `156px`, height: `15px` }} className="troubleshoot-logo" />
            <p className="u-fontSize--normal u-color--tundora u-lineHeight--more u-fontWeight--normal u-marginTop--10 body-copy">Start by codifying what you want to collect and analyze.</p>
          </div>
        </div>
        <div className="step add-spec">
          <div className="flex alignItems--center step-content">
            <span className="icon add-blue-icon" />
            <p className="u-fontSize--small u-marginLeft--10 u-fontWeight--medium u-color--dustyGray u-lineHeight--normal">Add preflights</p>
          </div>
        </div>
        <div className="tbl-lifecycle-block preflight flex">
          <div className="flex-auto u-marginRight--10">
            <span className="icon preflight-small" />
          </div>
          <div>
            <p className="u-fontSize--large u-color--biscay u-lineHeight--default">Preflight check</p>
            <p className="u-fontSize--normal u-color--tundora u-lineHeight--more u-fontWeight--normal u-marginTop--10 body-copy">Checks are used to validate ENV before installation.</p>
          </div>
        </div>
        <div className="step checks-pass">
          <div className="flex alignItems--center step-content">
            <span className="icon green-checkmark-icon" />
            <p className="u-fontSize--small u-marginLeft--10 u-fontWeight--medium u-color--dustyGray u-lineHeight--normal">Checks pass</p>
          </div>
        </div>
        <div className="tbl-lifecycle-block deploy-app flex">
          <div className="flex-auto u-marginRight--20">
            <span className="icon deploy-app-icon" />
          </div>
          <div>
            <p className="u-fontSize--large u-color--biscay u-lineHeight--default">Deploy your app</p>
            <p className="u-fontSize--normal u-color--tundora u-lineHeight--more u-fontWeight--normal u-marginTop--10 body-copy">Application is deployed to your customers.</p>
          </div>
        </div>
        <div className="step customer-issue">
          <div className="flex alignItems--center step-content">
            <p className="u-fontSize--small u-marginRight--10 u-fontWeight--medium u-color--dustyGray u-lineHeight--normal">Customer issue</p>
            <span className="icon red-warning-icon" />
          </div>
        </div>
        <div className="tbl-lifecycle-block support flex">
          <div className="flex-auto u-marginRight--10">
            <span className="icon support-small" />
          </div>
          <div>
            <p className="u-fontSize--large u-color--biscay u-lineHeight--default">Support</p>
            <p className="u-fontSize--normal u-color--tundora u-lineHeight--more u-fontWeight--normal u-marginTop--10 body-copy">Collectors are used to debug when errors occur.</p>
          </div>
        </div>
        <div className="step repeat-cycle">
          <div className="flex alignItems--center step-content">
            <p className="u-fontSize--small u-marginRight--10 u-fontWeight--medium u-color--dustyGray u-lineHeight--normal">Repeat cycle</p>
            <span className="icon repeat-cycle-icon" />
          </div>
        </div>
      </div>
    );
  }
}