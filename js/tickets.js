// Ticket tracking simulation functionality for Netflix support requests

document.addEventListener('DOMContentLoaded', function() {
    const trackForm = document.getElementById('trackForm');
    const ticketInput = document.getElementById('ticketNumber');
    const errorMessage = ticketInput.nextElementSibling;
    const ticketResult = document.getElementById('ticketResult');

    // Sample ticket data for Netflix-related issues
    const sampleTickets = {
        'NF-12345': {
            id: 'NF-12345',
            name: 'Thomas Anderson',
            category: 'Streaming Issues',
            subject: 'Poor Video Quality on Samsung Smart TV',
            status: 'processing',
            statusText: 'In Progress',
            date: '2023-10-05',
            lastUpdate: '2023-10-08',
            description: 'Our technical team is investigating the streaming quality issue on your Samsung TV. We\'ve identified possible network throttling by your ISP during peak hours.',
            nextSteps: 'A technical specialist will contact you within 24 hours with a detailed solution.'
        },
        'NF-67890': {
            id: 'NF-67890',
            name: 'Jessica Parker',
            category: 'Billing Questions',
            subject: 'Double Charge on Monthly Subscription',
            status: 'complete',
            statusText: 'Resolved',
            date: '2023-09-28',
            lastUpdate: '2023-10-01',
            description: 'We confirmed an accidental double-charge on your account due to a payment processing error. A full refund has been issued to your original payment method.',
            nextSteps: 'The refund should appear in your account within 3-5 business days. Case closed.'
        },
        'NF-54321': {
            id: 'NF-54321',
            name: 'Michael Johnson',
            category: 'Account Management',
            subject: 'Cannot Access Account After Password Reset',
            status: 'waiting',
            statusText: 'Awaiting Your Response',
            date: '2023-10-10',
            lastUpdate: '2023-10-10',
            description: 'We\'ve sent a secure password reset link to your backup email address. We\'re waiting for you to complete the verification process.',
            nextSteps: 'Please check your email (including spam folder) and follow the instructions in our message.'
        }
    };

    if (trackForm) {
        trackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const ticketNumber = ticketInput.value.trim();
            
            // Validate ticket number
            if (!ticketNumber) {
                errorMessage.textContent = 'Please enter a request number';
                errorMessage.style.display = 'block';
                return;
            }
            
            // Simulate loading
            ticketResult.innerHTML = `
                <div class="result-default">
                    <i class="fas fa-spinner fa-spin"></i>
                    <h3>Looking up your request...</h3>
                    <p>This will just take a moment</p>
                </div>
            `;
            
            // Delay to simulate searching
            setTimeout(() => {
                const ticket = sampleTickets[ticketNumber];
                
                if (ticket) {
                    // Format date
                    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
                    const formattedDate = new Date(ticket.date).toLocaleDateString('en-US', dateOptions);
                    const formattedUpdate = new Date(ticket.lastUpdate).toLocaleDateString('en-US', dateOptions);
                    
                    // Define status class
                    let statusClass = '';
                    switch(ticket.status) {
                        case 'processing':
                            statusClass = 'processing';
                            break;
                        case 'complete':
                            statusClass = 'complete';
                            break;
                        case 'waiting':
                            statusClass = 'waiting';
                            break;
                    }
                    
                    // Show ticket result
                    ticketResult.innerHTML = `
                        <div class="ticket-result-details">
                            <h3>Support Request #${ticket.id}</h3>
                            <span class="status-badge ${statusClass}">${ticket.statusText}</span>
                            
                            <div class="result-info">
                                <p><strong>Submitted by:</strong> ${ticket.name}</p>
                                <p><strong>Category:</strong> ${ticket.category}</p>
                                <p><strong>Subject:</strong> ${ticket.subject}</p>
                                <p><strong>Submitted on:</strong> ${formattedDate}</p>
                                <p><strong>Last Update:</strong> ${formattedUpdate}</p>
                                <p><strong>Status Update:</strong> ${ticket.description}</p>
                                <p><strong>Next Steps:</strong> ${ticket.nextSteps}</p>
                            </div>
                            
                            <div class="ticket-actions">
                                <button class="btn btn-secondary" onclick="alert('Feature coming soon!')">
                                    <i class="fas fa-comment"></i> Add Comment
                                </button>
                            </div>
                        </div>
                    `;
                } else {
                    ticketResult.innerHTML = `
                        <div class="result-default">
                            <i class="fas fa-exclamation-triangle ticket-icon"></i>
                            <h3>Request Not Found</h3>
                            <p>We couldn't find a support request with that number. Please check the number and try again, or submit a new request.</p>
                        </div>
                    `;
                }
                
                // Clear any error message
                errorMessage.style.display = 'none';
                
            }, 1500);
        });
    }
});
