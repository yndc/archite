import { SqlDriverSpecification, BaseDataType, DataTypePropertyType } from '../specification'

/**
 * Returns a list of all types available in a Sql driver
 * @param driverSpec
 */
export function allTypes(driverSpec: SqlDriverSpecification): string[] {
  const result = []
  driverSpec.dataTypes.base.forEach(typeList => {
    Array.prototype.push.apply(result, typeList)
  })
  return result
}

/**
 * Creates a base type mapping
 * @param driverSpec
 */
export function createBaseTypeMap(driverSpec: SqlDriverSpecification): Map<string, BaseDataType> {
  const result = new Map<string, BaseDataType>()
  driverSpec.dataTypes.base.forEach((typeList, baseType) => {
    typeList.forEach(typeName => result.set(typeName, baseType))
  })
  return result
}

/**
 * Creates a map that takes a type name to produce a list of properties that is needed by the type
 * @param driverSpec
 */
export function createPropertiesMap(driverSpec: SqlDriverSpecification): Map<string, DataTypePropertyType[]> {
  const result = new Map<string, DataTypePropertyType[]>()
  const getProperties = (typeName: string) => {
    const propertyTypes: DataTypePropertyType[] = []
    driverSpec.dataTypes.with.forEach((typeList, propertyType) => {
      if (typeList.includes(typeName)) propertyTypes.push(propertyType)
    })
    return propertyTypes
  }
  allTypes(driverSpec).forEach(type => result.set(type, getProperties(type)))
  return result
}
