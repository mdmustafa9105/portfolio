import React from 'react';

const MarqueeItem: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex items-center mx-8 shrink-0">
        <span className="text-4xl font-bold text-black">{text}</span>
        <span className="text-black text-4xl mx-8">*</span>
    </div>
);

interface MarqueeProps {
  data: any;
}

const Marquee: React.FC<MarqueeProps> = ({ data }) => {
    const fullList = [...data.marquee, ...data.marquee, ...data.marquee, ...data.marquee];

    return (
        <section className="py-8 transform -rotate-2 my-20" style={{backgroundColor: data.color.primary}}>
            <div className="overflow-hidden">
                <div className="marquee-content">
                    {fullList.map((item, index) => (
                        <MarqueeItem key={index} text={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Marquee;
