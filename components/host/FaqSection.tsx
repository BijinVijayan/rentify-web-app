"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
    {
        id: 1,
        question: "How do I list my property on Rentify?",
        answer:
            "To list your property, sign up as a host and complete the 'Add New Listing' form with your property’s details, images, and pricing. Once submitted, our team will review and publish your listing.",
    },
    {
        id: 2,
        question: "Can I list both properties for rent and for sale?",
        answer:
            "Yes! Rentify lets you list your property for rent, for sale, or both. When adding a new listing, simply select your preferred options.",
    },
    {
        id: 3,
        question: "What documents do I need to verify my property?",
        answer:
            "You will need a valid ID, ownership documents, and recent property photos. Our team may request additional details for verification purposes.",
    },
    {
        id: 4,
        question: "Are there any charges to list my property?",
        answer:
            "Listing your property on Rentify is free. We charge a service fee only when your property is successfully rented or sold through the platform.",
    },
    {
        id: 5,
        question: "How can I contact interested renters or buyers?",
        answer:
            "All inquiries and booking requests appear in your Host Dashboard Messaging tab. You can chat securely with interested parties, schedule viewings, and manage responses within the dashboard.",
    },
    {
        id: 6,
        question: "What kind of tenants or buyers use Rentify?",
        answer:
            "Rentify is open to verified renters and buyers looking for homes, apartments, villas, and offices. We ensure user profiles and property leads are vetted for authenticity.",
    },
    {
        id: 7,
        question: "Can I edit or pause my listing after posting?",
        answer:
            "Yes. Use the Properties tab in your dashboard to update details, edit images, adjust prices, or pause listings anytime you want.",
    },
    {
        id: 8,
        question: "How are payments and commissions handled?",
        answer:
            "All payments are processed securely via Rentify. You'll receive payouts directly to your registered account, minus any applicable service fees. Payment breakdowns and commission details are available in your Analytics tab.",
    },
    {
        id: 9,
        question: "Is my personal data safe on Rentify?",
        answer:
            "We use strong encryption and never share your private information with third parties. For details, see our Privacy Policy.",
    },
    {
        id: 10,
        question: "Who do I contact for support with my listing?",
        answer:
            "You can reach our support team via the Help section in your dashboard, or at support@rentify.com. We typically respond within one business day.",
    },
];

export default function FaqSection() {
    const [openItem, setOpenItem] = useState<number | null>(null);

    const toggleItem = (id: number) => {
        setOpenItem(openItem === id ? null : id);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 md:py-14">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight text-center mb-5 sm:mb-8">Frequently asked questions</h3>
                <div className="space-y-1 sm:space-y-4 md:space-y-6">
                    {faqData.map((faq) => (
                        <div
                            key={faq.id}
                            className="border-b py-4 space-y-2 border-[#D5DFFF]"
                        >
                            <button
                                onClick={() => toggleItem(faq.id)}
                                className="w-full text-left flex justify-between items-center focus:outline-none"
                            >
                                <span className="text-bluedark2 pr-5 sm:pr-8">{faq.question}</span>
                                <span className="flex-shrink-0 cursor-pointer">
                  {openItem === faq.id ? (
                      <svg
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                          <g clipPath="url(#clip0_50_131)">
                              <g clipPath="url(#clip1_50_131)">
                                  <path
                                      d="M12.3398 2.14014C6.40984 2.14014 1.58984 6.96014 1.58984 12.8901C1.58984 18.8201 6.40984 23.6401 12.3398 23.6401C18.2698 23.6401 23.0898 18.8201 23.0898 12.8901C23.0898 6.96014 18.2698 2.14014 12.3398 2.14014ZM12.3398 22.1401C7.23984 22.1401 3.08984 17.9901 3.08984 12.8901C3.08984 7.79014 7.23984 3.64014 12.3398 3.64014C17.4398 3.64014 21.5898 7.79014 21.5898 12.8901C21.5898 17.9901 17.4398 22.1401 12.3398 22.1401Z"
                                      fill="#1F1346"
                                  />
                                  <path
                                      d="M12.34 9.88023C12.15 9.88023 11.96 9.95023 11.81 10.1002L8.28 13.6302C7.99 13.9202 7.99 14.4002 8.28 14.6902C8.57 14.9802 9.05 14.9802 9.34 14.6902L12.34 11.6902L15.34 14.6902C15.63 14.9802 16.11 14.9802 16.4 14.6902C16.69 14.4002 16.69 13.9202 16.4 13.6302L12.87 10.1002C12.72 9.95023 12.53 9.88023 12.34 9.88023Z"
                                      fill="#1F1346"
                                  />
                              </g>
                          </g>
                          <defs>
                              <clipPath id="clip0_50_131">
                                  <rect
                                      width="24"
                                      height="24"
                                      fill="white"
                                      transform="matrix(1 0 0 -1 0.339844 24.8901)"
                                  />
                              </clipPath>
                              <clipPath id="clip1_50_131">
                                  <rect
                                      width="24"
                                      height="24"
                                      fill="white"
                                      transform="matrix(1 0 0 -1 0.339844 24.8901)"
                                  />
                              </clipPath>
                          </defs>
                      </svg>
                  ) : (
                      <svg
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                          <g clipPath="url(#clip0_50_182)">
                              <path
                                  d="M12.3398 23.6401C6.40984 23.6401 1.58984 18.8201 1.58984 12.8901C1.58984 6.96014 6.40984 2.14014 12.3398 2.14014C18.2698 2.14014 23.0898 6.96014 23.0898 12.8901C23.0898 18.8201 18.2698 23.6401 12.3398 23.6401ZM12.3398 3.64014C7.23984 3.64014 3.08984 7.79014 3.08984 12.8901C3.08984 17.9901 7.23984 22.1401 12.3398 22.1401C17.4398 22.1401 21.5898 17.9901 21.5898 12.8901C21.5898 7.79014 17.4398 3.64014 12.3398 3.64014Z"
                                  fill="#1F1346"
                              />
                              <path
                                  d="M12.34 15.9C12.15 15.9 11.96 15.83 11.81 15.68L8.28 12.15C7.99 11.86 7.99 11.38 8.28 11.09C8.57 10.8001 9.05 10.8001 9.34 11.09L12.34 14.09L15.34 11.09C15.63 10.8001 16.11 10.8001 16.4 11.09C16.69 11.38 16.69 11.86 16.4 12.15L12.87 15.68C12.72 15.83 12.53 15.9 12.34 15.9Z"
                                  fill="#1F1346"
                              />
                          </g>
                          <defs>
                              <clipPath id="clip0_50_182">
                                  <rect
                                      width="24"
                                      height="24"
                                      fill="white"
                                      transform="translate(0.339844 0.890137)"
                                  />
                              </clipPath>
                          </defs>
                      </svg>
                  )}
                </span>
                            </button>
                            <AnimatePresence>
                                {openItem === faq.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="text-sm sm:text-base text-primaryuiColor pr-8">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
        </div>
    );
}
