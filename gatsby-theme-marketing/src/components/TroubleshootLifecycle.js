import * as React from "react";
import "../scss/components/TroubleshootLifecycle.scss";

export default function TroubleshootLifecycle({ isMobile }) {
  if (isMobile) {
    return (
      <div>
        <div className="flex alignItems--center">
          <div className="step-number flex-auto">1</div>
          <div className="tbl-lifecycle-block preflight flex">
            <div className="flex-auto u-marginRight--10">
              <span className="icon preflight-checks-icon" />
            </div>
            <div className="flex flex-column">
              <p className="u-fontSize--large u-color--biscay u-lineHeight--default">Preflight checks</p>
              <p className="u-fontSize--normal u-color--tundora u-lineHeight--more u-fontWeight--normal u-marginTop--10 body-copy">Collectors and Analyzers validate before installation.</p>
            </div>
          </div>
        </div>
        <div className="step checks-pass u-paddingTop--10 u-paddingBottom--10">
          <div className="flex alignItems--center step-content">
            <span className="icon green-checkmark-icon" />
            <p className="u-fontSize--small u-marginLeft--10 u-fontWeight--medium u-color--silver u-lineHeight--normal">Checks pass</p>
          </div>
        </div>

        <div className="flex alignItems--center">
          <div className="step-number flex-auto">2</div>
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
            <p className="u-fontSize--small u-marginLeft--10 u-fontWeight--medium u-color--silver u-lineHeight--normal">Customer issue</p>
          </div>
        </div>

        <div className="flex alignItems--center">
          <div className="step-number flex-auto">3</div>
          <div className="tbl-lifecycle-block support flex">
            <div className="flex-auto u-marginRight--10">
              <span className="icon support-bundle-icon" />
            </div>
            <div className="flex flex-column">
              <p className="u-fontSize--large u-color--biscay u-lineHeight--default">Support bundle</p>
              <p className="u-fontSize--normal u-color--tundora u-lineHeight--more u-fontWeight--normal u-marginTop--10 body-copy">Collectors and Analyzers reveal the source of issues.</p>
            </div>
          </div>
        </div>

        <div className="step repeat-cycle  u-paddingTop--10 u-paddingBottom--10">
          <div className="flex alignItems--center step-content">
            <span className="icon repeat-cycle-icon" />
            <p className="u-fontSize--small u-marginLeft--10 u-fontWeight--medium u-color--silver u-lineHeight--normal">Escalation needed</p>
          </div>
        </div>


        <div className="flex alignItems--center">
          <div className="step-number flex-auto">4</div>
          <div className="tbl-lifecycle-block support flex">
            <div className="flex-auto u-marginRight--10">
              <span className="icon icon tblshoot-yaml-doc" />
            </div>
            <div className="flex flex-column">
              <p className="u-fontSize--large u-color--biscay u-lineHeight--default">Send to vendor</p>
              <p className="u-fontSize--normal u-color--tundora u-lineHeight--more u-fontWeight--normal u-marginTop--10 body-copy">Share your bundle with a vendor for support.</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-column">
        <div className="u-flexTabletReflow">
          <div className="flex flex-column justifyContent--center alignItems--center">
            <span className="icon preflight-checks-icon"> </span>
            <p className="u-fontSize--large u-color--biscay u-fontWeight--medium u-lineHeight--default u-marginTop--10 ">Preflight checks</p>
            <p className="u-fontSize--normal u-color--tundora u-lineHeight--more u-fontWeight--normal u-marginTop--10 body-copy">Collectors and Analyzers validate before installation.</p>
          </div>
          <div className="flex flex-column justifyContent--center alignItems--center u-marginLeft--40">
            <span className="icon deploy-app-icon"> </span>
            <p className="u-fontSize--large u-color--biscay u-fontWeight--medium u-lineHeight--default u-marginTop--10 ">Deploy your app</p>
            <p className="u-fontSize--normal u-color--tundora u-lineHeight--more u-fontWeight--normal u-marginTop--10 body-copy">Application is deployed to your customers.</p>
          </div>
          <div className="flex flex-column justifyContent--center alignItems--center u-marginLeft--40">
            <span className="icon support-bundle-icon"> </span>
            <p className="u-fontSize--large u-color--biscay u-fontWeight--medium u-lineHeight--default u-marginTop--10 ">Support bundle</p>
            <p className="u-fontSize--normal u-color--tundora u-lineHeight--more u-fontWeight--normal u-marginTop--10 body-copy">Collect logs and analyze environment for diagnosis.</p>
          </div>
          <div className="flex flex-column justifyContent--center alignItems--center u-marginLeft--40">
            <span className="icon icon tblshoot-yaml-doc"> </span>
            <p className="u-fontSize--large u-color--biscay u-fontWeight--medium u-lineHeight--default u-marginTop--10 ">Send to vendor</p>
            <p className="u-fontSize--normal u-color--tundora u-lineHeight--more u-fontWeight--normal u-marginTop--10 body-copy">Share your bundle with a vendor for support.</p>
          </div>
        </div>
        <div className="u-flexTabletReflow justifyContent--center alignItems--center u-marginTop--20">
          <div className="step-number flex-auto">1</div>

          <div className="step checks-pass u-paddingTop--10 u-paddingBottom--10">
            <div className="flex flex-column alignItems--center step-content">
              <span className="icon green-checkmark-icon" />
              <p className="u-fontSize--small u-fontWeight--medium u-color--silver u-lineHeight--normal">Check pass</p>
            </div>
          </div>

          <div className="step-number flex-auto">2</div>
          <div className="step customer-issue u-paddingTop--10 u-paddingBottom--10">
            <div className="flex flex-column alignItems--center step-content">
              <span className="icon red-warning-icon" />
              <p className="u-fontSize--small u-fontWeight--medium u-color--silver u-lineHeight--normal">Customer issue</p>
            </div>
          </div>

          <div className="step-number flex-auto">3</div>
          <div className="step escalation-needed u-paddingTop--10 u-paddingBottom--10">
            <div className="flex flex-column alignItems--center step-content">
              <span className="icon repeat-cycle-icon" />
              <p className="u-fontSize--small u-fontWeight--medium u-color--silver u-lineHeight--normal">Escalation needed</p>
            </div>
          </div>

          <div className="step-number flex-auto">4</div>
        </div>
      </div>
    );
  }
}