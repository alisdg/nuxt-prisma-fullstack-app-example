import {readBody} from "h3";


export function body(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
  let method = descriptor.value!;

  descriptor.value = async function () {
    const body = await readBody(arguments[0])
    return method.apply(this, [...arguments, body]);
  };
}
