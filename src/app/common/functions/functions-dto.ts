import {AddressReq, CompanyDetailRes, CompanyReq} from "../../dto/class.definition";

export function toCompanyReq(res: CompanyDetailRes): CompanyReq {
  const req: CompanyReq = new CompanyReq();
  Object.assign(req, res);
  const userAdmin = res.users.find(u => u.admin);
  req.email = userAdmin.email;
  const addressRes = res.addresses[0];
  if (addressRes) {
    const addressReq: AddressReq = new AddressReq();
    Object.assign(addressReq, addressRes);
    req.address = addressReq
  }
  return req;
}
