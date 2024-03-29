const cdk = require('@aws-cdk/core');
const { DNS_Stack } = require('./infrastructure/domain-stack');
const { Lambda_Stack } = require('./infrastructure/lambda-stack');
const { ApiG_Stack } = require('./infrastructure/apig-stack');
class DomainManagementStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log(props.env.account, props.env.region)
    const { zone, domainName, certificate } = new DNS_Stack(this, 'DNS_Stack');
    const { hellofx } = new Lambda_Stack(this, 'Lambda-Stack');
    new ApiG_Stack(this, "API_Stack", {zone, domainName, certificate, hellofx})

  }
}

module.exports = { DomainManagementStack }
