import React, { useState } from 'react'

function MesoFAQ() {
    const categories = [
        { id: 'law', name: 'LAW', active: false },
        { id: 'finance', name: 'FINANCE & COMPENSATION', active: false },
        { id: 'process', name: 'PROCESS RELATED', active: false },
        { id: 'fightForMeso', name: 'FIGHTFORMESO', active: false }
    ];

    // FAQ questions and answers
    const faqItems = [
        {
            id: 1,
            question: 'How do I know if I qualify for a mesothelioma lawsuit?',
            answer: 'If you or a loved one has mesothelioma from asbestos exposure, you may be eligible. Key factors include your work history, exposure sources, and medical records.',
            category: 'law',
            expanded: false
        },
        {
            id: 2,
            question: 'What compensation can I receive for a mesothelioma case?',
            answer: 'You may receive compensation for medical bills, lost wages, pain, suffering, and wrongful death claims.',
            category: 'law',
            expanded: false
        },
        {
            id: 3,
            question: 'How long do I have to file a mesothelioma claim?',
            answer: 'The time limit to file a lawsuit depends on your states statute of limitations. Typically, it ranges from 1 to 5 years after diagnosis. Its best to act fast and consult a legal expert.',
            category: 'law',
            expanded: false
        },
        {
            id: 4,
            question: 'What happens after I submit my case for review?',
            answer: 'Our legal team will assess your eligibility and connect you with a mesothelioma attorney then guide you through the process with no upfront cost.',
            category: 'law',
            expanded: true
        }
    ];

    // State management
    const [selectedCategory, setSelectedCategory] = useState('law');
    const [expandedItems, setExpandedItems] = useState(
        faqItems.reduce((acc, item) => {
            acc[item.id] = false; // Set all to false initially to collapse all items
            return acc;
        }, {})
    );

    // Toggle FAQ item expansion
    const toggleItem = (id) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Handle category selection
    const handleCategoryChange = (categoryId) => {
        if (selectedCategory === categoryId) {
            setSelectedCategory(null); // Unselect if clicking the same category
        } else {
            setSelectedCategory(categoryId); // Select new category
        }
    };

    // Filter FAQ items by selected category or show all if none selected
    const filteredItems = selectedCategory
        ? faqItems.filter(item => item.category === selectedCategory)
        : faqItems;

    return (
        <section className="py-4 px-4 sm:py-6 bg-[#FAF3EC] font-sans">
            <div className="max-w-8xl mx-4 sm:mx-8 md:mx-16 lg:mx-32">
                <h2
                    className="w-full max-w-[914px] text-[#4B2C5E] font-georgia italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[80px] 2xl:text-[100px] font-normal leading-tight sm:leading-normal text-left"
                    style={{ fontFeatureSettings: "'dlig' on" }}
                >
                    Frequently Asked Questions
                </h2>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mt-8">
                    <div className="w-full lg:w-1/3">
                    </div>

                    <div className="w-full lg:w-3/4">
                        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg relative overflow-hidden w-full">

                            <div className="absolute inset-0 bg-orange-100 opacity-15 pointer-events-none z-0"></div>

                            <div className="relative z-10">
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((item, index) => (
                                        <div key={item.id} className={`py-2 ${expandedItems[item.id] ? 'expanded' : ''}`}>
                                            {index > 0 && <div className="h-px bg-[#4B2C5E] my-3 sm:my-5 md:my-8"></div>}
                                            <div className="flex items-start sm:items-center cursor-pointer" onClick={() => toggleItem(item.id)}>
                                                <button
                                                    className={`w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 p-0 mr-3 sm:mr-4 transition-transform duration-300 mt-1 sm:mt-0 flex items-center justify-center ${expandedItems[item.id] ? 'rotate-0' : ''}`}
                                                    aria-label="Toggle answer"
                                                >
                                                    <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                                                        <span
                                                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 sm:w-1 h-5 sm:h-6 bg-amber-600 transition-opacity duration-300"
                                                            style={{ opacity: expandedItems[item.id] ? 0 : 1 }}
                                                        ></span>
                                                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 sm:w-6 h-0.5 sm:h-1 bg-amber-600"></span>
                                                    </div>
                                                </button>
                                                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#4B2C5E] flex-1 leading-tight sm:leading-normal">
                                                    {item.question}
                                                </h3>
                                            </div>
                                            {expandedItems[item.id] && (
                                                <div className="pt-3 sm:pt-4 md:pt-5 pl-11 sm:pl-12 md:pl-14 animate-fadeIn">
                                                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#4B2C5E] leading-relaxed">
                                                        {item.answer}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-10 text-center">
                                        <p className="text-lg sm:text-xl text-gray-500">No questions found for this category.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default MesoFAQ