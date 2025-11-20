import React from 'react'
// import {PropertyDetailsType} from "@/types/property";

import PropertyDetails from "@/components/PropertyDetails";
import {mockPropertyDetailsDubai} from "@/types/mockProperty";

const Property = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = params.then((p) => p.id);
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/${id}`, {
    //     cache: 'no-store'
    // });
    // if (!res.ok) throw new Error('Property not found');
    // const property: PropertyDetailsType = await res.json();
    return (
        <div className={"bg-slate-50"}>
            <PropertyDetails property={mockPropertyDetailsDubai} />
        </div>
    )
}
export default Property
