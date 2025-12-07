
type Props = {
    pricePerMonth: number;
    currency: string;
    securityDeposit?: number;
    maintenance?: number;
    onBook: () => void;
    onScheduleTour?: () => void;
    listingType: "RENT" | "SALE";
};
export default function PricingBox({  pricePerMonth, currency, listingType, securityDeposit, maintenance, onBook, onScheduleTour }: Props) {
    return (
        <div className="sm:rounded-lg bg-white sm:shadow p-5 mx-auto max-w-[380px] space-y-1">
            <div className="flex items-center justify-between mb-3">
                <div className="text-xl sm:text-2xl font-bold">{currency} {pricePerMonth}/month</div>
                {listingType === "RENT" ? <span className="bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-semibold">For Rent</span>
                    : <span className="bg-green-100 text-green-600 px-3 py-1.5 rounded-md    text-xs font-semibold">For Sale</span>}
            </div>
            <div className="text-sm text-gray-500">Security Deposit: AED {securityDeposit}</div>
            <div className="text-sm text-gray-500 mb-3">Maintenance: AED {maintenance}/month</div>
            <div className={"flex flex-col gap-2 mt-6"}>
                <button onClick={onBook} className="max-sm:text-sm w-full cursor-pointer bg-primary-color text-white py-2.5 rounded-lg mb-2 font-semibold">Book Now</button>
                <button onClick={onScheduleTour} className=" max-sm:text-sm w-full cursor-pointer bg-gray-100 text-gray-800 py-2.5 rounded-lg font-semibold">Schedule Tour</button>
            </div>
            </div>
    );
}
