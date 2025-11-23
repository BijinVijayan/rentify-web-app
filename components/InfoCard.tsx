import React, {ReactNode} from 'react';

interface InfoCardProps {
    iconName: ReactNode;
    iconBgClass?: string;
    iconColorClass?: string;
    title: string;
    description: string;
    center?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({
                                               iconName,
                                               iconBgClass = 'bg-primary/10 rounded-full size-16',
                                               iconColorClass = 'text-primary',
                                               title,
                                               description,
                                               center = false,
                                           }) => {
    return (
        <div
            className={`flex flex-1 gap-4 sm:gap-6 rounded-xl border border-slate-200 dark:border-border-dark bg-white dark:bg-background-dark p-6 flex-col  ${center ? 'items-center text-center' : 'items-start'}`}
        >
            <div className={`flex items-center justify-center ${iconBgClass} ${iconColorClass}`}>
                <span className="material-symbols-outlined !text-3xl">{iconName}</span>
            </div>
            <div className={`flex flex-col gap-2`}>
                <h3 className="text-slate-900 text-lg font-bold leading-tight">{title}</h3>
                <p className="text-slate-600 text-sm font-normal leading-normal">{description}</p>
            </div>
        </div>
    );
};

export default InfoCard;
